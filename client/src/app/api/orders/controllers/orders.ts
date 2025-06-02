import type { Context } from 'koa'

import { Order, User } from '@/types/types'

// тип данных для create в Strapi, user - id, а не объект
type CreateOrderData = Omit<Order, 'id' | 'createdAt' | 'updated' | 'user'> & {
	user: number | string
	paymentInfo: unknown
}

type CustomRequest = Context['request'] & {
	body: {
		data: CreateOrderData
	}
}

interface StrapiEntityService {
	create(uid: string, params: { data: CreateOrderData }): Promise<Order>

	find(ctx: Context): Promise<{ data: Order[]; meta: unknown }>
}

interface Strapi {
	entityService: StrapiEntityService
}

declare const strapi: Strapi

module.exports = {
	async create(ctx: Context): Promise<Order | void> {
		const user = ctx.state.user as User | undefined
		if (!user) {
			ctx.unauthorized('Пользователь не авторизован')
			return
		}

		const req = ctx.request as CustomRequest
		const data = req.body.data

		// user - id, как ожидает Strapi
		data.user = user.id

		const entity = await strapi.entityService.create('api::order.order', {
			data,
		})

		return this.transformResponse(entity)
	},

	async find(ctx: Context): Promise<{ data: Order[]; meta: unknown } | void> {
		const user = ctx.state.user as User | undefined
		if (!user) {
			ctx.unauthorized('Пользователь не авторизован')
			return
		}

		let filters: Record<string, unknown> = {}

		const rawFilters = ctx.query.filters

		if (rawFilters && typeof rawFilters === 'object' && !Array.isArray(rawFilters)) {
			filters = rawFilters as Record<string, unknown>
		}

		Object.assign(ctx.query, {
			filters: {
				...filters,
				'user.id': user.id,
			},
		})

		const { data, meta } = await super.find(ctx)

		return { data, meta }
	},
}
