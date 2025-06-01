'use strict'

module.exports = {
	async create(ctx) {
		const user = ctx.state.user
		if (!user) {
			return ctx.unauthorized('Пользователь не авторизован')
		}

		const data = ctx.request.body.data

		// Принудительно ставим связь с пользователем
		data.user = user.id

		const entity = await strapi.entityService.create('api::order.order', {
			data,
		})

		return this.transformResponse(entity)
	},

	// async find(ctx) {
	// 	const user = ctx.state.user;
	// 	if (!user) {
	// 		return ctx.unauthorized('Пользователь не авторизован');
	// 	}

	// 	// Подмешиваем фильтр по текущему пользователю
	// 	ctx.query = {
	// 		...ctx.query,
	// 		filters: {
	// 			...(ctx.query.filters || {}),
	// 			user: user.id,
	// 		},
	// 	};

	// 	// Вызываем стандартный find с подменённым ctx.query
	// 	const { data, meta } = await super.find(ctx);

	// 	return { data, meta };
	// },
	async find(ctx) {
		const user = ctx.state.user
		if (!user) {
			return ctx.unauthorized('Пользователь не авторизован')
		}

		// Правильный фильтр для связи manyToOne user
		ctx.query = {
			...ctx.query,
			filters: {
				...(ctx.query.filters || {}),
				'user.id': user.id,
			},
		}

		// Вызов базового find с новым фильтром
		const { data, meta } = await super.find(ctx)

		return { data, meta }
	},
}
