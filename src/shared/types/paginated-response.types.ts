export interface PaginationPayload {
	page: number;
	take: number;
	totalPages: number;
}

export type PaginatedResponse<T> = {
	data: T[];
	meta: PaginationPayload;
};
export interface PaginationParams {
	page: number;
	take: number;
}
