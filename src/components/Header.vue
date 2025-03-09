<script setup>
</script>
<!-- Sign-Up / Booking Form: Address, preferred contact, payment. -->
<template>
    <header>
        <ul>
            <li><a href="#hero">Top</a></li>
            <li><a href="#pricing">Price</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#signup">Sign Up Now</a></li>
        </ul>
    </header>
</template>

<style scoped>
header {
    position: fixed;
    width: 100%;
    display: flex;
    height: 50px;
    background-color: var(--purple);
    z-index: 1;
}

header ul {
    list-style: none;
    display: flex;
    width: 100%;
}

header ul li {
    display: inline;
    margin-right: 5%;
    width: auto;
}

header ul li a {
    color: white;
    text-decoration: none;
}

header ul li a:hover {
    color: var(--gold);
}
</style>
