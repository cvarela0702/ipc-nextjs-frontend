'use client'

import {
    InstantSearch,
    SearchBox,
    Hits,
    RefinementList,
    Configure,
    Pagination,
    HitsPerPage,
    SortBy,
    ClearRefinements,
    CurrentRefinements,
} from 'react-instantsearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { Heart, Star } from '@phosphor-icons/react'
import Link from 'next/link'
import { RatingMenu } from './RatingMenu'
// import '@/styles/search.css'
import 'instantsearch.css/themes/algolia.css'
// import 'instantsearch.css/themes/satellite.css'
// import 'instantsearch.css/themes/reset.css'
console.log(15, process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY)
const { searchClient } = instantMeiliSearch(
    'http://localhost:7700/',
    process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
)

const RecipeHit = ({ hit }) => {
    const formatNumber = num => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k+'
        }
        return num?.toString() ?? ''
    }

    return (
        <Link
            href={`/recipe/${hit.slug}`}
            className="block transition-transform hover:scale-[1.02]">
            <div className="bg-white shadow-md rounded-lg overflow-hidden h-full">
                <img
                    src={hit.image_url}
                    alt={hit.title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {hit.title}
                    </h2>
                    <p className="text-gray-600 mb-2">{hit.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Heart
                                weight="fill"
                                className="text-red-500"
                                size={16}
                            />
                            {formatNumber(hit.favorites_count)}
                        </span>
                        <span className="flex items-center gap-1">
                            {hit.ratings_avg?.toFixed(1) || '0.0'}
                            <Star
                                weight="fill"
                                className="text-yellow-500"
                                size={16}
                            />
                        </span>
                        <span>({formatNumber(hit.ratings_count)})</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const SearchPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <InstantSearch
                indexName="recipes"
                searchClient={searchClient}
                routing>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
                        <h2 className="text-xl font-semibold mb-4">Filters</h2>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">
                                Categories
                            </h3>
                            <RefinementList attribute="categories" />
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">
                                Preparation time
                            </h3>
                            <RefinementList attribute="preparation_time" />
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">
                                Cooking Time
                            </h3>
                            <RefinementList attribute="cooking_time" />
                        </div>

                        <div className="mb-6">
                            <RatingMenu attribute="ratings_avg" max={5} />
                        </div>
                    </div>

                    {/* Search Results */}
                    <div className="lg:col-span-3">
                        <div className="mb-6">
                            <SearchBox
                                className="w-full"
                                translations={{
                                    placeholder: 'Search for recipes...',
                                }}
                            />
                        </div>

                        <div className="Search-header">
                            <HitsPerPage
                                items={[
                                    {
                                        label: '8 hits per page',
                                        value: 8,
                                        default: true,
                                    },
                                    { label: '40 hits per page', value: 40 },
                                ]}
                            />
                            <SortBy
                                defaultRefinement="recipes"
                                items={[
                                    {
                                        value: 'recipes',
                                        label: 'Relevant',
                                    },
                                    {
                                        value: 'recipes:favorites_count:desc',
                                        label: 'Most Popular',
                                    },
                                    {
                                        value: 'recipes:ratings_avg:desc',
                                        label: 'Most liked',
                                    },
                                ]}
                            />
                        </div>

                        <div className="CurrentRefinements">
                            <ClearRefinements />
                            <CurrentRefinements />
                        </div>

                        <Configure
                            hitsPerPage={8}
                            attributesToSnippet={['description:50']}
                        />

                        <Hits hitComponent={RecipeHit} />
                        <Pagination className="Pagination" />
                    </div>
                </div>
            </InstantSearch>
        </div>
    )
}

export default SearchPage
