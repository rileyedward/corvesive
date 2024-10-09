import type { Actions } from '@sveltejs/kit';

export const actions = {
	// TODO: Login Action
	default: async () => {
		return {
			message: 'This is the default action'
		};
	}
} satisfies Actions;
