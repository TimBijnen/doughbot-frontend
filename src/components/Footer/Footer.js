import FooterItem from "./Item"
import { HomeIcon, CoinIcon, WalletIcon } from "../Icon"
// import { ProjectorIcon, HomeIcon, TradesIcon, CoinIcon, LogIcon, WalletIcon, SettingsIcon, Piggy } from "../Icon"
import { useAuth } from "../Auth"


const Footer = () => {
    const [ { user } ] = useAuth()

    return (
        <footer className="d-flex shadow-lg" style={{minHeight: 32}}>
            { user && (
                <>
                    <FooterItem className="m-auto" link="/">
                        <HomeIcon width={24} height={24}/>
                    </FooterItem>
                    <FooterItem className="m-auto" link="/oversold">
                        <CoinIcon width={24} height={24}/>
                    </FooterItem>
                    <FooterItem className="m-auto" link="/wallet">
                        <WalletIcon width={24} height={24}/>
                    </FooterItem>
                </>
            ) }
        </footer>
    )
}
export default Footer