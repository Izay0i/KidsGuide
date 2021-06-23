<template>
	<div class="favorites shadow-lg">
		<b-form class="form w-100 m-5">
			<b-card-group deck>
				<b-card 
					class="card" 
					v-for="favorite in favorites" 
					v-bind:key="favorite.fav_id"
				>
					<b-button-close 
						variant="danger" 
						size="sm" 
						v-on:click="confirmDeletion(favorite.fav_id)"
					></b-button-close>

					<b-card-header v-bind:header="favorite.title">
						<b-icon variant="warning" icon="bookmark-fill"></b-icon>
						&nbsp; {{ favorite.title }}
					</b-card-header>
					<router-link v-bind:to="{ name: 'Post', params: { id: favorite.post_id } }">
						<b-card-body>
							<b-card-img-lazy v-bind:src="favorite.thumbnail"></b-card-img-lazy>
						</b-card-body>
					</router-link>
					<b-card-footer>
						Ngày đăng: {{ favorite.post_time }}
					</b-card-footer>
				</b-card>
			</b-card-group>
		</b-form>

		<b-modal 
			id="delete-fav-pop-up" 
			title="Bỏ lưu bài viết?" 
			ok-title="Có" 
			ok-variant="danger" 
			cancel-title="Hủy" 
			v-on:ok="deleteFavorite"
		></b-modal>
	</div>
</template>

<script>
	import moment from 'moment';

	import FavService from '@/services/FavService.js';

	export default {
		name: 'UserFavorites',
		data: function() {
			return {
				favorites: [],
				fav_id: -1
			};
		},
		mounted: function() {
			this.getAllFavByUID();
		},
		methods: {
			getAllFavByUID: async function() {
				FavService.getAllFavByUID(this.$route.params.id)
				.then(response => {
					this.formatPostTime(response);
					this.favorites = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			deleteFavorite: async function() {
				FavService.deleteFavorite(this.fav_id)
				.then(response => {
					console.log(response);
					this.getAllFavByUID();
				})
				.catch(error => {
					console.log(error);
				});
			},
			confirmDeletion: function(id) {
				this.fav_id = id;
				this.$bvModal.show('delete-fav-pop-up');
			},
			formatPostTime: function(arr) {
				arr.forEach(
					(item) => item.post_time = moment(item.post_time).format('DD/MM/YYYY hh:mm A')
				);
			}
		}
	}
</script>

<style scoped>
	input, input:focus, 
	select, select:focus, 
	textarea, textarea:focus 
	{
		background-color: transparent;
		color: #36454f;
		border: 0;
		border-radius: 0;
		border: 2px dashed rgba(0, 0, 0, 0.5);
		box-shadow: none;
	}	

	.favorites {
		display: flex;
		justify-content: space-evenly;
		height: auto;
		padding: 20px;
		border-radius: 10px;
		background-color: #e0c9a6;
	}

	.form {
		font-style: italic;
	}

	.card {
		border-radius: 5px;
		border: 7px double rgba(0, 0, 0, 0.5);
		background-color: #e0c9a6;
	}
</style>