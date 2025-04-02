import CategoryNav from '@/components/CategoryNav'

const Header = () => {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">

                <CategoryNav />
            </div>
        </header>
    )
}

export default Header