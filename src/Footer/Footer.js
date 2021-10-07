import FooterItem from "./Item"
import { CoinIcon, LogIcon, WalletIcon } from "../Icon"
import { useAuth } from "../Auth"


const Footer = () => {
    const [ { user } ] = useAuth()

    return (
        <footer className="d-flex shadow-lg">
            { user && (
                <>
                    <FooterItem link="/oversold">
                        <CoinIcon />
                    </FooterItem>
                    <FooterItem link="/wallet">
                        <WalletIcon />
                    </FooterItem>
                    <FooterItem link="/log">
                        <LogIcon />
                    </FooterItem>
                </>
            ) }
        </footer>
    )
}
export default Footer