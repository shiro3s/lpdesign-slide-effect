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
	width: 90,
	height: 140,
	gap: 20,
};

export const useAnimation = () => {
	const containerRef = ref<HTMLElement>();
	const state = reactive<{
    active: number,
    width: number;
    height: number;
    top: number;
    left: number;
    order: number[]
  }>({
		active: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    order: []
	});

	const onNext = () => {
    state.order.push(state.order.shift() as number);

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
        const newPositionX = state.left + 180 + (data.length -1) * (card.width + card.gap);
        gsap.to(`.card-${prev}`, {
          x: newPositionX,
          y: state.top,
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
        const newPositionX = state.left + 180 + index * (card.width + card.gap);
        gsap.to(`.card-${i}`, {
          x: newPositionX,
          y: state.top,
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

				state.top = state.height - 180;
				state.left = state.width - 840;

				gsap.set(`.card-${state.active}`, {
					x: 0,
					y: 0,
					width: inlineSize,
					height: blockSize,
				});

        state.order.forEach((i, index) => {
          if (i === state.active) return
          gsap.set(`.card-${i}`, {
						x: state.left + 180 + index * (card.width + card.gap),
						y: state.top,
						width: card.width,
						height: card.height,
						zIndex: 30,
						borderRadius: 10,
					});
        })
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
