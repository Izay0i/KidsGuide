<template>
	<div>
		<b-navbar variant="dark" class="mb-3 shadow-lg">
			<b-nav-text class="text-white font-weight-bold mr-auto">Dashboard</b-nav-text>

			<b-form-input placeholder="Search post" class="w-50"></b-form-input>
			<b-button>
				<b-icon icon="search"></b-icon>
			</b-button>
		</b-navbar>

		<b-form-group class="ml-2 mr-auto w-75 shadow-sm">
			<b-form-input 
				placeholder="https://picsum.photos/300/300/?image=41" 
				v-model="card_content.img"
				v-bind:state="isPostImageValid"
			></b-form-input>

			<b-form-input 
				placeholder="Title" 
				v-model="card_content.title"
				v-bind:state="isPostTitleValid"
			></b-form-input>
			
			<b-form-input 
				placeholder="Content" 
				v-model="card_content.content"
				v-bind:state="isPostContentValid"
			></b-form-input>
		</b-form-group>

		<b-button-group class="ml-2 mb-3">
			<b-button class="mr-3 bg-success border-0 rounded" v-on:click="addPost">Add</b-button>
			<b-button class="mr-3 bg-warning border-0 rounded" v-on:click="updatePost">Update</b-button>
			<b-button class="mr-3 bg-danger border-0 rounded" v-on:click="deletePost">Delete</b-button>
		</b-button-group>

		<b-card-group columns class="m-5" v-if="cards.length">
			<CardItem 
				v-for="(card, index) in cards" 
				v-bind:key="index" 
				v-bind:prop_img="card.img" 
				v-bind:prop_title="card.title" 
				v-bind:prop_content="card.content"
			/>			
		</b-card-group>
	</div>
</template>

<script>
	import CardItem from '@/components/CardItem.vue';

	export default {
		name: 'AdminDashboard',
		components: {
			CardItem
		},
		data: function() {
			return {
				card_content: {
					img: '',
					title: '',
					content: ''
				},
				cards: []
			};
		},
		methods: {
			addPost: function() {
				this.cards.push(this.card_content);
			},
			updatePost: function() {
				console.log("Update");
			},
			deletePost: function() {
				var postTitle = this.card_content.title;
				const index = this.cards.filter(card => card.title.localeCompare(postTitle)).title;
				this.cards.splice(index, 1);
			}
		},
		computed: {
			isPostImageValid: function() {
				return this.card_content.img.length ? true : false;
			},
			isPostTitleValid: function() {
				return this.card_content.title.length ? true : false;
			},
			isPostContentValid: function() {
				return this.card_content.content.length ? true : false;
			}
		}
	};
</script>

<style>

</style>