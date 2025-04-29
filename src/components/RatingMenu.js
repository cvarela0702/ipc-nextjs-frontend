import { useConnector } from 'react-instantsearch'
import connectRatingMenu from 'instantsearch.js/es/connectors/rating-menu/connectRatingMenu'

export function useRatingMenu(props) {
    return useConnector(connectRatingMenu, props)
}

export function RatingMenu(props) {
    const { items, refine, createURL } = useRatingMenu(props)

    return (
        <ul className="ais-RatingMenu-list">
            {items.map(item => (
                <li key={item} className="ais-RatingMenu-item">
                    <a
                        className={`ais-RatingMenu-link ${item.isRefined ? 'font-bold' : ''}`}
                        aria-label={`${item.value} &amp; up`}
                        href={createURL(item.value)}
                        onClick={event => {
                            event.preventDefault()

                            refine(item.value)
                        }}>
                        {item.stars.map((isFilled, index) => (
                            <svg
                                className={`ais-RatingMenu-starIcon ais-RatingMenu-starIcon--empty`}
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth={isFilled ? 0 : 1.5}
                                aria-hidden="true"
                                width="24"
                                height="24">
                                {isFilled ? (
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"
                                    />
                                )}
                            </svg>
                        ))}

                        <span>{item.value} &amp; Up</span>
                        <span>({item.count})</span>
                    </a>
                </li>
            ))}
        </ul>
    )
}
