<script setup>
</script>
<!-- Pricing & Deals: Weekly rate + potential prepay discount (e.g., $18/month instead of $20). -->
<template>
    <section id="about">
        <div class="container">
            <div class="half fade-in">
                <h2>About Me</h2>
                <p><b>Who are you and why do you want my trash?</b></p>
                <p>I’m Matthew Allbright, a software developer who was recently laid off. While searching for my
                    next opportunity, I figured I’d offer my assistance to my neighbors. I don’t <i>want</i> your trash
                    per
                    se — I just want to make your life a little easier. I’ll take your trash to the curb on Sunday
                    evening
                    and bring it back on Monday. No stress, no mess.</p>
                <p><b>So how does this work?</b></p>
                <p>This website acts as a simple booking system where you can seamlessly request my service to put your
                    trash cans out for pickup.</p>
                <p><b>Who is this for?</b></p>
                <p>Anyone in the Warren Park area! Whether you’re going on vacation, assisting an elderly parent, or
                    just don’t have the time, I’m happy to handle it for you.</p>
                <p><b>How much does it cost?</b></p>
                <ul>
                    <li>$5 per week – I’ll take your bin to the curb on Sunday and bring it back on Monday.</li>
                    <li>$7.50 per week – I’ll take your trash out on Sunday and bring your recycling to the curb on
                        Monday.</li>
                </ul>
                <P><b>Can I book for multiple weeks?</b></P>
                <p>Certainly, if you'd like to get the month trash only is $17 for 4 consecutive weeks and $22 for trash AND recycling.</p>
                <p><b>May I buy on behalf of someone?</b></p>
                <p>That's a great question, as long as they are in Warren Park I'll take out their trash.</p>
            </div>
            <div class="half">
                <img src="../assets/matt.jpg" alt="Matthew Allbright">
            </div>
        </div>
        <div class="container full">
            <h2>What is the coverage area?</h2>
            <p>The coverage area for Curb Your Bins is focused on the neighborhoods surrounding Irvington Terrace Woods Park. Since this is a walking-based service, I aim to keep the coverage close to the blue pin marked on the map. If you're nearby and unsure whether you're within the area, feel free to reach out!</p>
            <img class="auto-img" src="../assets/coverage.png" alt="Thie is the coverage area, it's Warren Park in Indianapolis">
        </div>
    </section>
    <section id="splash">
    </section>
</template>

<style scoped>
section {
    display: block;
    height: auto;
}

#splash {
    background-image: url('../assets/splash.jpg');
    width: 100%;
    height: 100%;
    min-height: 500px;
    display: flex;
    background-position: center;
    background-size: cover;
}
</style>
