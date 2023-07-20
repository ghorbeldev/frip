class APIFeatures {
	constructor(query, totalQueries, queryString) {
		this.query = query;
		this.queryString = queryString;
		this.totalQueries = totalQueries;
	}
	search() {
		const keyword = this.queryString.keyword?.trim()
			? {
					name: {
						$regex: this.queryString.keyword,
						$options: 'i',
					},
			  }
			: {};
		this.query = this.query.find({ ...keyword });
		this.totalQueries = this.totalQueries.countDocuments({ ...keyword });
		return this;
	}
	filter() {
		const queryCopy = { ...this.queryString };
		const removeFields = ['keyword', 'limit', 'page'];
		removeFields.forEach(elm => {
			delete queryCopy[elm];
		});
		// advanced price & size filter
		let queryStr = JSON.stringify(queryCopy);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
		this.query = this.query.find(JSON.parse(queryStr));
		this.totalQueries = this.totalQueries.countDocuments(JSON.parse(queryStr));
		return this;
	}
	pagination(resPerPage) {
		const currentPage = Number(this.queryString.page) || 1;
		const skip = resPerPage * (currentPage - 1);

		this.query = this.query.limit(resPerPage).skip(skip);
		return this;
	}
}

module.exports = APIFeatures;
