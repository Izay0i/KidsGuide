<template>
    <div>
        <b-form class="rounded-lg w-75 m-auto p-3 bg-light">
            <b-form-group
                label="Email:"
                class="text-info"
            >
                <b-form-input
                    type="email"
                    placeholder="Enter email"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Password:"
                class="text-info"
            >
                <b-form-input
                    type="password"
                    placeholder="Enter password"
                    required
                ></b-form-input>
            </b-form-group>

            <div>
                <b-button class="bg-primary" to="/">Sign In</b-button>
                <b-button class="mx-4">Sign Up</b-button>
                
                <hr class="my-4"/>

                <b-link>Forgot password?</b-link>
            </div>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: 'LoginForm'
    }
</script>

<style scoped>

</style>