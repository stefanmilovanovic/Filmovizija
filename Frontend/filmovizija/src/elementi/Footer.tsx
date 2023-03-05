export default function Footer(){
    return(
        <footer className="bd-footer py-5 mt-5 bg-dark mt-auto">
            <div className="container">
                Aplikacija: Filmovizija {new Date().getFullYear().toString()} | By Stefan Milovanović
            </div>
        </footer>
    )
}