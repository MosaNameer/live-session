<script>
import {compile} from "vue/dist/vue.esm-bundler.js"

export default {
	props: {
		html: {
			type: String,
			default: "",
		},
	},
	data() {
		return { templateRender: undefined };
	},
	watch: {
		html(to) {
			this.updateRender();
		},
	},
	created() {
		this.updateRender();
	},
	methods: {
		updateRender() {
			const compiled = h(compile(this.html));
            this.templateRender = () => compiled;
			// this.templateRender = compiled.render;
			// this.$options.staticRenderFns = [];
			// for (const staticRenderFunction of compiled.staticRenderFns) {
			// 	this.$options.staticRenderFns.push(staticRenderFunction);
			// }
		},
	},
	render() {
		return this.templateRender();
	},
};
</script>