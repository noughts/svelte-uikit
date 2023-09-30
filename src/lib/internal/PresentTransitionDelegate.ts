import type { UIViewController, UIViewControllerAnimatedTransitioning, UIViewControllerContextTransitioning, UIViewControllerTransitioningDelegate } from "$lib/UIViewController.js";
import { tick } from "svelte";
import { sleep } from "./Util.js";
import { UIPercentDrivenInteractiveTransition } from "./UIPercentDrivenInteractiveTransition.js";

export class PresentTransitionDelegate implements UIViewControllerTransitioningDelegate {

	readonly interactionController = new UIPercentDrivenInteractiveTransition();

	animationControllerForPresented(
		presented: UIViewController,
		presenting: UIViewController,
		source?: UIViewController): UIViewControllerAnimatedTransitioning {
		return new PresentAnimator();
	}
	animationControllerForDismissed(dismissed: UIViewController): UIViewControllerAnimatedTransitioning {
		return new DismissAnimator();
	}
	interactionControllerForDismissal(animator: UIViewControllerAnimatedTransitioning):UIPercentDrivenInteractiveTransition{
		return this.interactionController;
	}
}	

class PresentAnimator implements UIViewControllerAnimatedTransitioning {
	async animateTransition(transitionContext: UIViewControllerContextTransitioning) {
		const duration = this.transitionDuration(transitionContext);

		transitionContext.toVC.containerScrollTop.set(0)
		await tick();
		transitionContext.toVC.containerScrollTop.set(500)
		transitionContext.fromVC.brightness.set(50);
		await sleep(duration * 1000)
	}
	transitionDuration(transitionContext: UIViewControllerContextTransitioning) {
		return 0.333
	}
}

class DismissAnimator implements UIViewControllerAnimatedTransitioning {
	async animateTransition(transitionContext: UIViewControllerContextTransitioning) {
		const duration = this.transitionDuration(transitionContext);

		transitionContext.fromVC.containerScrollTop.set(0)
		transitionContext.toVC.brightness.set(100);
		await sleep(duration * 1000);
	}
	transitionDuration(transitionContext: UIViewControllerContextTransitioning) {
		return 0.333
	}
}
