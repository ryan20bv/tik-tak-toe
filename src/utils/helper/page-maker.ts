type PropsType = {
	currPage: number
	maxPage: number
}

export function pageMaker(currPage: number, maxPage: number) {
	const uniquePages = new Set<string>()
	if (maxPage <= 1) {
		return
	} else if (maxPage < 7) {
		for (let index = 0; index <= maxPage + 1; index++) {
			if (index === 0) {
				uniquePages.add('Prev')
			} else if (index === maxPage + 1) {
				uniquePages.add('Next')
			} else {
				uniquePages.add(index.toString())
			}
		}
	} else if (maxPage >= 7) {
		for (let index = 0; index <= +maxPage + 1; index++) {
			if (index === 0) {
				uniquePages.add('Prev')
			}

			if (index === +maxPage + 1) {
				uniquePages.add('Next')
			}

			if (currPage > 4) {
				if (maxPage - currPage > 1) {
					if (index === 1) {
						uniquePages.add('1')
					} else if (index === 2) {
						uniquePages.add('..')
					} else if (index === 3) {
						uniquePages.add((currPage - 2).toString())
					} else if (index === 4) {
						uniquePages.add((currPage - 1).toString())
					} else if (index === 5) {
						uniquePages.add(currPage.toString())
					}

					if (maxPage - currPage < 2) {
						uniquePages.add(index.toString())
					} else if (maxPage - currPage >= 2) {
						if (index === maxPage - 2) {
							uniquePages.add((currPage + 1).toString())
						} else if (index === maxPage - 1 && maxPage - currPage > 2) {
							uniquePages.add('...')
						} else if (index === maxPage) {
							uniquePages.add(maxPage.toString())
						}
					}
				} else if (maxPage - currPage <= 1) {
					if (index === 1) {
						uniquePages.add('1')
					} else if (index === 2) {
						uniquePages.add('..')
					} else if (index === 3) {
						uniquePages.add((currPage - 2).toString())
					} else if (index === 4) {
						uniquePages.add((currPage - 1).toString())
					} else if (index === 5) {
						uniquePages.add(currPage.toString())
					}
					if (maxPage - currPage === 1) {
						if (index === maxPage - 1) {
							uniquePages.add(maxPage.toString())
						}
					}
				}
			}

			// currPage <=4
			if (currPage <= 4) {
				if (index === 1) {
					uniquePages.add(index.toString())
				} else if (index === 2) {
					uniquePages.add(index.toString())
				} else if (index === 3) {
					uniquePages.add(index.toString())
				} else if (index === 4) {
					uniquePages.add(index.toString())
				}

				if (maxPage - currPage < 2) {
					uniquePages.add(index.toString())
				} else if (maxPage - currPage >= 2) {
					if (index === maxPage - 2) {
						uniquePages.add((currPage + 1).toString())
					} else if (index === maxPage - 1) {
						uniquePages.add('...')
					} else if (index === maxPage) {
						uniquePages.add(maxPage.toString())
					}
				}
			}
		}
	}

	return uniquePages
}
