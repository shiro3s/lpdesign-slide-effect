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
	const state = reactive<{
    active: number,
    width: number;
    height: number;
    order: number[]
  }>({
		active: 0,
    width: 0,
    height: 0,
    order: []
	});

	const onNext = () => {
    state.order.push(state.order.shift() as number);

		const offsetLeft = state.width - 1160;
		const offsetTop = state.height - 360;

    const prev = state.active;
    state.active += 1
    if (state.active > data.length -1) state.active = 0

    gsap.to(`.card-${state.active}`, {
      x: 0,
      y: 0,
      ease: "sine.inOut",
      zIndex: 20,
      width: state.width,
      height: state.height,
      onComplete: () => {
        const newPositionX = offsetLeft + 200 + (data.length -1) * (card.width + card.gap);
        gsap.to(`.card-${prev}`, {
          x: newPositionX,
          y: offsetTop,
          width: card.width,
          height: card.height,
          borderRadius: 10,
          zIndex: 30,
          scale: 1
        })
      }
    });

    state.order.forEach((i, index) => {
      if (i === state.active) return
      if (i !== prev) {
        const newPositionX = offsetLeft + index * (card.width + card.gap);
        gsap.to(`.card-${i}`, {
          x: newPositionX,
          y: offsetTop,
          width: card.width,
          height: card.height,
          ease: "sine.inOut",
          zIndex: 30,
          delay: 0.1 * (index + 1),
        });
      }
    })
	};

	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			if (entry.devicePixelContentBoxSize.length) {
				const { blockSize, inlineSize } = entry.devicePixelContentBoxSize[0];

        state.width = inlineSize
        state.height = blockSize

				const offsetTop = state.height - 360;
				const offsetLeft = state.width - 1160;

				gsap.set(`.card-${state.active}`, {
					x: 0,
					y: 0,
					width: inlineSize,
					height: blockSize,
				});

				for (let i = 1; i < data.length; i++) {
					gsap.set(`.card-${i}`, {
						x: offsetLeft + 200 + i * (card.width + card.gap),
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

    state.order = data.map((_, index) => index)
		observer.observe(containerRef.value);
	});

	onUnmounted(() => {
		if (!containerRef.value) return;

		observer.unobserve(containerRef.value);
	});

	return {
		state,
		containerRef,
		onNext,
	};
};
