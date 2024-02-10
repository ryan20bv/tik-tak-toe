// ----------------------------------------------------------------------

const ROOTS = {
	HOME: '/home',
	AUTH: '/auth',
	DASHBOARD: '/dashboard',
	DONATIONS: '/donations',
	WIDGETS: '/widgets',
	ACCOUNT_BALANCE: '/account-balance'
}

// ----------------------------------------------------------------------

export const paths = {
	minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
	// HOME
	home: {
		root: ROOTS.HOME
	},
	// AUTH
	auth: {
		login: `${ROOTS.AUTH}/login`,
		register: `${ROOTS.AUTH}/register`,
		forgotPassword: `${ROOTS.AUTH}/forgot-password`,
		verify: `${ROOTS.AUTH}/verify`,
		newPassword: `${ROOTS.AUTH}/new-password`
	},
	// DASHBOARD
	dashboard: {
		root: ROOTS.DASHBOARD
	},
	donations: {
		root: ROOTS.DONATIONS
	},
	widgets: {
		root: ROOTS.WIDGETS,
		new: `${ROOTS.WIDGETS}/new`,
		edit: `${ROOTS.WIDGETS}/edit`,
		variations: {
			new: `${ROOTS.WIDGETS}/variations/new`,
			edit: `${ROOTS.WIDGETS}/variations/edit`
		},
		details: (id: string) => `${ROOTS.WIDGETS}/${id}`
	},
	accountBalance: {
		root: ROOTS.ACCOUNT_BALANCE
	}
}
