import SectionMain from '../src/components/SectionMain/SectionMain';

function App() {
    return (
        <>
            <main className="overflow-hidden px-5 w-screen h-screen flex justify-center items-center relative 2xl:px-96">
                <div className="w-70 h-70  bg-[#005CFF] rounded-full shadow-[0px_0px_100px_39px_rgba(0,_92,_255,_1)] absolute -left-70 bottom-0"></div>
                <div className="w-70 h-70  bg-[#005CFF] rounded-full shadow-[0px_0px_100px_39px_rgba(0,_92,_255,_1)] absolute -right-70 -top-20"></div>

                <div className="absolute -z-10 top-20 left-5 grid grid-cols-10 grid-rows-10 gap-4 2xl:left-70 2xl:top-30">
                    {[...Array(100)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-[#272727] w-2 h-2 rounded-full"
                        ></div>
                    ))}
                </div>

                <SectionMain />
            </main>
        </>
    );
}

export default App;
