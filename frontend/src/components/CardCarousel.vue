<template>
    <div>
        <h2><span>Các kỹ năng</span></h2>

        <b-carousel
            id="carousel-1"
            v-model="slide"
            v-bind:interval="4000"
            controls
            indicators
            background="#ababab"
            style="text-shadow: 1px 1px 2px #333;"
        >
            <!-- Text slides with image -->
            <b-carousel-slide
                caption="First slide"
                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                img-src="https://picsum.photos/1024/480/?image=52"
            ></b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
                <h3>Hello world!</h3>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
    export default {
        name: 'CardCarousel'
    }
</script>

<style scoped>
    h2 {
        width: 100%; 
        text-align: center;
        border-bottom: 1px solid white; 
        line-height: 0.1em;
        margin: 10px 0px 40px;
    } 

    h2 span { 
        background:#6a92f2;
        color: white;
        padding: 0px 10px; 
    }
</style>