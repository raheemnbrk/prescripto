import Header from "../components/home/header"
import Speciality from "../components/home/speciality"
import TopDoctors from "../components/home/topDoctors"
import Banner from "../components/home/banner"

export default function Home() {
    return (
        <>
            <div className="pt-8 space-y-8">
                <Header/>
                <Speciality/>
                <TopDoctors/>
                <Banner/>
            </div>
        </>
    )
}