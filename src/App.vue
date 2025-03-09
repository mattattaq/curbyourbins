<script setup>
import { onMounted } from 'vue'
import Hero from './components/Hero.vue'
import Pricing from './components/Pricing.vue'
import Signup from './components/Signup.vue'
import FAQ from './components/FAQ.vue'
import Contact from './components/Contact.vue'
import Header from './components/Header.vue'


onMounted(() => {
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.3 } // Element becomes visible when 30% of it is in view
  );

  elements.forEach((el) => observer.observe(el));
});
</script>

<template>
  <Header />
  <Hero />
  <Pricing />
  <Signup />
  <FAQ />
  <Contact />
</template>

<style scoped></style>
