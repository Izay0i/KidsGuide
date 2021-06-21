<template>
	<div>
		<b-card class="cards mx-auto shadow-lg">
			<b-dropdown variant="dark" size="sm">
				<template v-if="!isParamUserID">
					<b-dropdown-item><b-icon variant="warning" icon="bookmark"></b-icon> &nbsp; Lưu bài viết</b-dropdown-item>
					<b-dropdown-item v-on:click="confimReport">
						<b-icon variant="danger" icon="exclamation-triangle"></b-icon> &nbsp; Báo cáo bài viết
					</b-dropdown-item>
				</template>
				<template v-else>
					<b-dropdown-item v-on:click="updatePost">
						<b-icon variant="info" icon="pencil"></b-icon> &nbsp; Sửa
					</b-dropdown-item>
					<b-dropdown-item v-on:click="deletePost">
						<b-icon variant="danger" icon="x-circle"></b-icon> &nbsp; Xóa
					</b-dropdown-item>
				</template>
			</b-dropdown>

			<b-card-text class="title">
				{{ card_content.title }}
			</b-card-text>

			<router-link class="link" v-bind:to="{ name: 'Post', params: { id } }">
				<b-icon 
					icon="play-btn-fill" 
					class="icon" 
					v-if="card_content.vid"
				></b-icon>
				
				<b-img v-bind:src="card_content.banner" fluid-grow></b-img>
			</router-link>

			<b-card-text class="content">
				{{ card_content.content }}
			</b-card-text>
			
			<b-card-text class="date">
				Ngày đăng: {{ card_content.date }}
			</b-card-text>

			<b-badge 
				class="tags"
				v-for="tag in card_content.tags" 
				v-bind:key="tag"
			>
				{{ tag }}
			</b-badge>
		</b-card>

		<b-modal 
			id="report" 
			title="Báo cáo bài viết" 
			ok-title="Gửi" 
			ok-variant="danger" 
			cancel-title="Hủy" 
			v-on:ok="handleOk" 
			v-on:hidden="resetReportForm"
		>
			<b-form v-on:submit.stop.prevent="addReport">
				<b-form-group label="Lý do:">
					<b-form-input required v-model="reason"></b-form-input>
				</b-form-group>
			</b-form>
		</b-modal>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	import ReportService from '@/services/ReportService.js';

	export default {
		name: 'CardItem',
		props: {
			prop_id: {
				type: Number,
				required: true
			},
			prop_banner: {
				type: String,
				required: true
			},
			prop_vid: {
				type: String
			},
			prop_title: {
				type: String,
				required: true
			},
			prop_content: {
				type: String,
				required: true
			},
			prop_date: {
				type: String,
				required: true
			},
			prop_tags: {
				type: Array,
			}
		},
		data: function() {
			return {
				id: this.prop_id,
				card_content: {
					banner: this.prop_banner,
					vid: this.prop_vid,
					title: this.prop_title,
					content: this.prop_content,
					date: this.prop_date,
					tags: this.prop_tags
				},
				reason: ''
			};
		},
		methods: {
			updatePost: function() {
				this.$emit('update-card', this.id);
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: 'smooth'
				});
			},
			deletePost: function() {
				//calling delete-card event from AdminDashboard.vue with a value of this.id
				this.$emit('delete-card', this.id);
			},
			addReport: async function() {
				if (!this.isReasonValid) {
					return;
				}

				const user = JSON.parse(localStorage.getItem('user'));
				let payload = {
					uid: user.uid,
					post_id: this.id,
					reason: this.reason
				};

				ReportService.createReport(payload)
				.then(response => {
					console.log(response);

					this.$bvModal.hide('report');
				})
				.catch(error => {
					console.log(error);
				})
			},
			confimReport: function() {
				this.$bvModal.show('report');
			},
			handleOk: function(event) {
				event.preventDefault();

				this.addReport();
			},
			resetReportForm: function() {
				this.reason = '';
			}
		},
		computed: {
			...mapGetters({
				isParamUserID: 'isParamUserID'
			}),
			isReasonValid: function() {
				return this.reason.length;
			}
		}
	};
</script>

<style scoped>
	body {
		display: flex;
	}

	div {
		flex: 0 0 100%;
	}

	img {
		border-radius: 10px;
		margin-bottom: 10px;
	}

	.link {
		position: relative;
	}

	.link .icon {
		position: absolute;
		transform: scale(1.5) translate(50%, 50%);
	}

	.link > * {
		text-decoration: none;
		color: white;
	}

	.cards {
		background-color: #ddb892;
		border: 0;
		border-radius: 20px;
		margin-bottom: 35px;
		max-width: 38vw;
	}

	.title {
		color: #9c6644;
		text-align: center;
		font-size: 2.5rem;
	}

	.content {
		color: #7f5539;
		overflow: auto;
		max-height: 20vh;
		white-space: pre-wrap;
	}

	.date {
		text-align: center;
		border-radius: 20px;
		padding: 7px;
		background-color: #7f5539;
		color: white;
	}

	.tags {
		margin-right: 5px;
	}

	.footer {
		display: flex;
	}

	@media screen and (max-width: 768px) {
		.card {
			max-width: 100vw;
		}
	}
</style>