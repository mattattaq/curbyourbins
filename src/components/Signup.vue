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
                <div class="form-group left">
                    <label for="prepay">
                        <input type="checkbox" id="prepay" v-model="prepay" />
                        Prepay for a Month? 
                    </label>
                    <span>Get 4 consecutive weeks of service for just $17 for trash and $27 for both when you prepay!</span>
                </div>
                <div id="total">${{ price }}</div>
            </form>

            <!-- PayPal Button Container -->
            <div id="paypal-button-container"></div>
        </div>
    </section>
    <section id="splash-two"></section>
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
        price.value = serviceType.value === 'trashOnly' ? 17.00 : 27;
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
                sendEmailConfirmation(); // Send email after successful payment
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
#total {
    color: green;
    font-weight: bold;
    font-size: 24px;
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

#splash-two {
    width: 100%;
    min-height: 500px;
    background-image: url('../assets/curbyourbins.webp');
    display: flex;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}
.left {
    text-align: left;
}
</style>
