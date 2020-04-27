<template>
	<div class="wt-radio">
		<ul>
			<li v-for="(item, index) in dataSource" :key="index" @click="handle(item, index)" :class="{ disable: item.disable }">
				<p v-if="showBtn != undefined" :class="{ 'icon-check active': index === isActive, btn: showBtn != undefined, disable: item.disable }"></p>
				<div class="item-inner">
					<div class="title" :class="{ normal: showBtn != undefined }">{{ item.name }}</div>
					<!-- <div class="subtitle" :class="{ normal: showBtn != undefined }">{{ item.desc }}</div> -->
				</div>
				<p v-if="showBtn == undefined" :class="{ 'icon-check active': index === isActive }"></p>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'wt-radio-group',
	props: {
		dataSource: {
			type: Array,
			default: function() {
				return [];
			}
		},
		showBtn: {
			type: String,
			default: function() {
				return undefined;
			}
		}
	},
	data() {
		return {
			isActive: '',
			selected: null
		};
	},
	methods: {
		handle(item, index) {
			if (item.disable) {
				return;
			}
			this.selected = item;
			this.isActive = index;
			this.$emit('handle', item, index);
		}
	}
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.wt-radio {
	ul {
		background: #ffffff;
		list-style: none;
		padding: 0;
		margin: 0;
		position: relative;
		li {
			box-sizing: border-box;
			position: relative;
			text-align: left;
			// line-height: 2rem;
			// height: 2rem;
			font-size: 0.8rem;
			display: flex;
			align-items: center;
			&.disable {
				background: #f6f6f6;
			}
			.item-inner {
				width: 100%;
				box-sizing: border-box;
				white-space: nowrap;
				// padding-right: 2rem;
				text-overflow: ellipsis;
				overflow: hidden;
				padding-left: 8px;
				&::after {
					transform: scaleY(0.5);
					height: 1px;
					content: '';
					border-bottom: 1px solid #ccc;
					display: block;
				}
				.title {
					display: -webkit-box;
					-webkit-line-clamp: 1;
					overflow: hidden;
					-webkit-box-orient: vertical;
					white-space: normal;
					margin: 0.2rem;
					padding-right: 2rem;
					&.normal {
						padding-right: 0;
					}
				}
				.subtitle {
					display: -webkit-box;
					-webkit-line-clamp: 2;
					overflow: hidden;
					-webkit-box-orient: vertical;
					white-space: normal;
					color: #999;
					font-size: 0.7rem;
					margin: 0.2rem;
					padding-right: 2rem;
					&.normal {
						padding-right: 0;
					}
				}
			}
			p {
				position: absolute;
				right: 0.5rem;
				color: #1bb5f1;
				font-size: 1rem;
				&.btn {
					min-width: 1.2rem;
					min-height: 1.2rem;
					width: 1.2rem;
					height: 1.2rem;
					border-radius: 1.2rem;
					border: 1px solid #ccc;
					box-sizing: border-box;
					overflow: hidden;
					align-items: center;
					margin: 0 0 0 0.5rem;
					justify-content: center;
					display: flex;
					position: relative;
					right: initial;
					&.active {
						border: 1px solid #1bb5f1;
					}
					&.disable {
						background: #eee;
					}
				}
			}
			&::before {
				font-size: 1rem;
				position: absolute;
				right: 8px;
				line-height: 2rem;
				color: #1bb5f1;
				text-align: right;
			}
		}
	}
}
</style>
