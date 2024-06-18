const Faq = () => {

    return (
            <ul className="list-group list-group-flush rounded-4 mt-5">
                <li className="list-group-item card-bg-color text-white">
                    <button className="btn btn-link link-light" type="button" data-bs-toggle="collapse" data-bs-target="#whatIsSlug" aria-expanded="false" aria-controls="collapseExample">
                        What is a slug?
                    </button>
                    <div className="collapse text-white" id="whatIsSlug">
                    The data used on this website for NFTs are provided by MagicEden, which currently for SOLANA NFTs collections does not support searching by the name of the collection but only via slug. The slug is made up of one or more words and represents a part of the URL, usually consisting of one or more words written in lowercase. For example, ‘degods’ or ‘mad_lads’.
                    </div>
                </li>
                <li className="list-group-item card-bg-color">
                    <button className="btn btn-link link-light" type="button" data-bs-toggle="collapse" data-bs-target="#findSlug" aria-expanded="false" aria-controls="collapseExample">
                        How to find the correct slug?
                    </button>
                    <div className="collapse text-white" id="findSlug">
                        To find the correct slug, visit the MagicEden website and search for the collection you want to find. Click on the desired collection and look in the address bar after the domain. You can use that slug to search for the collection on this site.<br />
                        Example 1: magiceden.io/marketplace/mad_lads -{'>'} the slug is ‘mad_lads’<br />
                        Example 2: magiceden.io/marketplace/degods -{'>'} the slug is ‘degods’<br />
                        Remember not to include the quotation marks in the search bar.
                    </div>
                </li>
                <li className="list-group-item card-bg-color">
                    <button className="btn btn-link link-light" type="button" data-bs-toggle="collapse" data-bs-target="#findSlug" aria-expanded="false" aria-controls="collapseExample">
                    Why are there no data available before 01/03/2021?
                    </button>
                    <div className="collapse text-white" id="findSlug">
                    This project was launched on March 1, 2021, and therefore data has been saved on our server from that day onward.
                    </div>
                </li>
            </ul>
    )
}

export default Faq