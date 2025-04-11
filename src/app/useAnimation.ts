import { reactive, onMounted, ref, onUnmounted } from "vue";

import gsap from "gsap";

export const data = [
	{
		img: "/ruins.png",
	},
	{
		img: "/forest.png",
	},
	{
		img: "/ruins_in_water.png",
	},
	{
		img: "/castle.png",
	},
	{
		img: "/ice_world.png",
	},
	{
		img: "/sci_fi.png",
	},
];

const card = {
	width: 200,
	height: 300,
	gap: 40,
};

export const useAnimation = () => {
	const containerRef = ref<HTMLElement>();
	const state = reactive({
		active: 0,
	});

	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			if (entry.devicePixelContentBoxSize.length) {
				const { blockSize, inlineSize } = entry.devicePixelContentBoxSize[0];
				const offsetTop = blockSize - 360;
				const offsetLeft = inlineSize - 1280;

				gsap.set(`.card-${state.active}`, {
					x: 0,
					y: 0,
					width: inlineSize,
					height: blockSize,
				});

				for (let i = 1; i < data.length; i++) {
					gsap.set(`.card-${i}`, {
						x: offsetLeft + 400 + i * (card.width + card.gap),
						y: offsetTop,
						width: card.width,
						height: card.height,
						zIndex: 30,
						borderRadius: 10,
            
					});
				}
			}
		}
	});

	onMounted(() => {
		if (!containerRef.value) return;

		observer.observe(containerRef.value);
	});

	onUnmounted(() => {
		if (!containerRef.value) return;

		observer.unobserve(containerRef.value);
	});

	return {
		state,
		containerRef,
	};
};
