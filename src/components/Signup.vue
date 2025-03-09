<script setup>
import { onMounted, ref } from 'vue';
import emailjs from 'emailjs-com';
const name = ref('');
const email = ref('');
const address = ref('');
const serviceType = ref('trashOnly');
const prepay = ref(false);
const price = ref(5.00);
// Load Google API script
const loadGoogleAPI = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
        window.gapi.load("client:auth2", initGoogleCalendar);
    };
    document.body.appendChild(script);
};

// Initialize Google Calendar API
const initGoogleCalendar = () => {
    window.gapi.client.init({
        apiKey: "AIzaSyA1hbksR9g7xOO_KapFLtBrANb8BzqFpEA",
        clientId: "531966254342-tbgblj53eptqvoq4ekrku6cdc8n9ro44.apps.googleusercontent.com",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar.events"
    }).then(() => {
        console.log("Google Calendar API Loaded");
    }).catch(err => console.error("Google API Error:", err));
};

// Sign in to Google Calendar
const signInToGoogle = async () => {
    try {
        await window.gapi.auth2.getAuthInstance().signIn();
        console.log("Signed in to Google Calendar");
    } catch (error) {
        console.error("Sign-in failed", error);
    }
};

// Create a Google Calendar Event
const createCalendarEvent = () => {
    const event = {
        summary: "Curb Your Bins - Trash Pickup",
        location: address.value,
        description: `Service: ${serviceType.value === 'trashOnly' ? "Trash Only" : "Trash & Recycling"}\nPaid: $${price.value.toFixed(2)}`,
        start: {
            dateTime: new Date().toISOString(), // Event time (adjust as needed)
            timeZone: "America/Indianapolis",
        },
        end: {
            dateTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour duration
            timeZone: "America/Indianapolis",
        }
    };

    window.gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event
    }).then(response => {
        alert("Google Calendar event created!");
        console.log("Event Created:", response);
    }).catch(err => console.error("Error creating event:", err));
};

// Call this function after PayPal payment is completed
const handleSuccessfulPayment = async () => {
    await signInToGoogle(); // Ensure user is signed in
    createCalendarEvent();  // Add event to Google Calendar
};

// Load Google API when component is mounted
onMounted(() => {
    loadGoogleAPI();
});
</script>
<template>
    <section id="signup">
        <div class="container">
            <h2>Ready to Curb Your Bin?</h2>
            <p>Sign up now to start making your life a little easier! Choose your plan, select a date, and I’ll take
                care of the rest. No hassle, no worries!</p>

            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="name">Your Name</label>
                    <input type="text" id="name" v-model="name" required placeholder="Enter your full name" />
                </div>
                <div class="form-group">
                    <label for="email">Your Email</label>
                    <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" id="address" v-model="address" required
                        placeholder="Enter your address in Warren Park" />
                </div>
                <div class="form-group">
                    <label for="serviceType">Select Service</label>
                    <select id="serviceType" v-model="serviceType" required>
                        <option value="trashOnly">Trash Only - $5</option>
                        <option value="trashAndRecycling">Trash & Recycling - $7.50</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="prepay">Prepay for a Month?</label>
                    <input type="checkbox" id="prepay" v-model="prepay" />
                    <span>Save $1/month when you prepay!</span>
                </div>
            </form>

            <!-- PayPal Button Container -->
            <div id="paypal-button-container"></div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import emailjs from 'emailjs-com';

const name = ref('');
const email = ref('');
const address = ref('');
const serviceType = ref('trashOnly');
const prepay = ref(false);
const price = ref(5.00);

const updatePrice = () => {
    if (prepay.value) {
        price.value = serviceType.value === 'trashOnly' ? 17.00 : 25.50;
    } else {
        price.value = serviceType.value === 'trashOnly' ? 5.00 : 7.50;
    }
};

// Watch for changes in service type or prepay selection
watch([serviceType, prepay], updatePrice);

const sendEmailConfirmation = () => {
    const templateParams = {
        user_name: name.value,
        user_email: email.value,
        service: serviceType.value === 'trashOnly' ? "Trash Only" : "Trash & Recycling",
        amount_paid: `$${price.value.toFixed(2)}`,
        user_address: address.value,
    };

    emailjs.send('service_wyjwlam', 'service_wyjwlam', templateParams, '87ACKoygvoido7HBh')
        .then(() => {
            alert(`Confirmation email sent to ${email.value}`);
        })
        .catch((error) => {
            console.error("Email sending failed:", error);
        });
};

const renderPayPalButton = () => {
    window.paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    description: `Trash Service - ${serviceType.value}`,
                    amount: { value: price.value.toFixed(2) }
                }]
            });
        },
        onApprove: (data, actions) => {
    return actions.order.capture().then(details => {
        alert(`Transaction completed by ${details.payer.name.given_name}`);
        sendEmailConfirmation(); // Send confirmation email
        handleSuccessfulPayment(); // Add to Google Calendar
    });
}
    }).render("#paypal-button-container");
};

const loadPayPal = () => {
    if (window.paypal) {
        renderPayPalButton();
    } else {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AYpKNwYk-llZ57nCsb_lvqlYwu_8lsv1Dv55BtD-9g6HexuZuluYfPJyuEsVasIqFRYor12f-2UoaGYF&currency=USD";
        script.onload = renderPayPalButton;
        document.body.appendChild(script);
    }
};

// Load PayPal button when component is mounted
onMounted(loadPayPal);
</script>

<style scoped>
#signup {
    background-color: #f5f5f5;
    padding: 30px;
    text-align: center;
}

.container {
    max-width: 600px;
    margin: 0 auto;
}

h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    font-weight: bold;
    display: block;
}

input,
select {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

input[type="checkbox"] {
    width: auto;
    display: inline-block;
}

#paypal-button-container {
    margin-top: 20px;
}
</style>
