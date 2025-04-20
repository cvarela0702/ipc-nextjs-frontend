import Link from 'next/link'
import {
    MagnifyingGlassIcon,
    CpuChipIcon,
    GlobeAltIcon,
} from '@heroicons/react/24/outline'
import {
    EnvelopeIcon,
    PhoneIcon,
    ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/solid'

export const metadata = {
    title: 'Worldwide Recipes - Discover Global Cuisine',
}

const Home = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-orange-500 to-red-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Worldwide Recipes
                        </h1>
                        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                            Discover, create, and share recipes from around the
                            world. Powered by AI to help you find the perfect
                            dish for any occasion.
                        </p>
                        <Link
                            href="/login"
                            className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition duration-300">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <MagnifyingGlassIcon className="h-8 w-8 text-orange-500 mr-3" />
                            <h3 className="text-xl font-semibold text-white">
                                AI-Powered Search
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            Find recipes using natural language. Our AI
                            understands your cravings and dietary preferences.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <CpuChipIcon className="h-8 w-8 text-orange-500 mr-3" />
                            <h3 className="text-xl font-semibold text-white">
                                AI Recipe Generation
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            Let our AI create unique recipes based on your
                            available ingredients and preferences.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <GlobeAltIcon className="h-8 w-8 text-orange-500 mr-3" />
                            <h3 className="text-xl font-semibold text-white">
                                Global Cuisine
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            Explore authentic recipes from every corner of the
                            world, with detailed instructions and cultural
                            insights.
                        </p>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 text-white">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-orange-600 dark:text-orange-300">
                                    1
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">
                                Create an Account
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Sign up to save your favorite recipes and create
                                your own.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-orange-600 dark:text-orange-300">
                                    2
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">
                                Search or Create
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Use our AI search or create your own recipes
                                with our easy-to-use interface.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-orange-600 dark:text-orange-300">
                                    3
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">
                                Share & Enjoy
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Share your creations with the community and
                                discover new culinary adventures.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">
                                Worldwide Recipes
                            </h3>
                            <p className="text-gray-400">
                                Discover the world's flavors in one place.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">
                                Legal
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/terms"
                                        className="text-gray-400 hover:text-white">
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacy"
                                        className="text-gray-400 hover:text-white">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">
                                Company
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-gray-400 hover:text-white">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-gray-400 hover:text-white">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">
                                Follow Us
                            </h4>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white">
                                    <EnvelopeIcon className="h-8 w-8" />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white">
                                    <PhoneIcon className="h-8 w-8" />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white">
                                    <ChatBubbleLeftRightIcon className="h-8 w-8" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()} Worldwide Recipes.
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
