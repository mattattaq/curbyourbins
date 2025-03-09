<template>
    <section id="contact">
        <img src="../assets/cutebin.webp" alt="Cute Trash Bin" class="circle">
        <div class="container">
            <h2>Contact Me</h2>
            <p>If you have any questions, concerns, or just want to chat about the service, feel free to reach out. I'm
                happy to help!</p>

            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="contactName">Your Name</label>
                    <input type="text" id="contactName" v-model="contactName" required placeholder="Enter your name" />
                </div>
                <div class="form-group">
                    <label for="contactEmail">Your Email</label>
                    <input type="email" id="contactEmail" v-model="contactEmail" required
                        placeholder="Enter your email" />
                </div>
                <div class="form-group">
                    <label for="contactMessage">Your Message</label>
                    <textarea id="contactMessage" v-model="contactMessage" required
                        placeholder="Type your message here..."></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const contactName = ref('');
const contactEmail = ref('');
const contactMessage = ref('');

const handleSubmit = () => {
    const email = "mattatttaq@gmail.com"; // Replace with your actual email
    const subject = encodeURIComponent("Curb Your Bins - Inquiry");
    const body = encodeURIComponent(
        `Name: ${contactName.value}\nEmail: ${contactEmail.value}\n\nMessage:\n${contactMessage.value}`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};
</script>


<style scoped>
#contact {
    background-color: #f5f5f5;
    padding: 30px;
    text-align: center;
}

.container {
    max-width: 600px;
    margin: 0 auto;
}

.circle {
    width: auto;
    max-width: 300px;
    border-radius: 25%;
}

.confirmation {
    margin-top: 20px;
    background-color: #e9f7e9;
    padding: 15px;
    border-radius: 5px;
    color: #4CAF50;
    font-weight: bold;
}

.form-group {
    margin-bottom: 1.5rem;
}

h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
}

p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 1.5rem;
}

label {
    font-weight: bold;
    display: block;
}

input,
textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

textarea {
    resize: vertical;
    height: 150px;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #45a049;
}
</style>