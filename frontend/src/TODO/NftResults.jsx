import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function NftResults() {
    const location = useLocation();
    const results = location.state?.results || [];
    const initialWallet = location.state?.userWallet || [];
    const [userWallet, setUserWallet] = useState(initialWallet);

    const isNftInWallet = (nft) => {
        return userWallet.some(existing => existing.slug_nft === nft.id_crypto);
    };

    const handleAddToWallet = async (nft) => {
        try {
            const response = await axios.post('/api/v1/nftwallet', {
                
            })
        }
    }

}

export default NftResults