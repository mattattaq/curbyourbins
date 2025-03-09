<script setup>
</script>
<!-- Hero Section: Quick pitch—"Skip the hassle! For $5, we handle your trash bins." 
 How It Works: Simple steps (e.g., "1. Schedule, 2. Pay, 3. Relax").-->
<template>
    <section id="hero">
        <div class="container">
            <h1>Ditch the chore! I’ll curb your bins for <span class='red'>$5</span>!</h1>
            <center><a href="#signup"><button>Sign up
                        now!</button></a></center>
        </div>
    </section>
</template>

<style scoped>
#hero {
    width: 100%;
    min-height: 600px;
    background: black;
    background-image: url('../assets/hero.jpg');
    background-position: center;
    background-size: cover;
}

#hero h1 {
    text-align: center;
    min-height: 400px;
    line-height: 400px;
    color: white;
    font-size: 32px;
}

button {
    background-color: var(--gold);
    padding: 12px 12px;
    border-radius: 5px;
    border: none;
    min-width: 150px;
    color: white;
    font-family: 'Courier New', Courier, monospace;
}

button:hover {
    background-color: var(--purple);
}
</style>
