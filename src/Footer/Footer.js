import FooterItem from "./Item"
import { TradesIcon, CoinIcon, LogIcon, WalletIcon, SettingsIcon } from "../Icon"
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
                    <FooterItem link="/trades">
                        <TradesIcon />
                    </FooterItem>
                    <FooterItem link="/log">
                        <LogIcon />
                    </FooterItem>
                    <FooterItem link="/settings">
                        <SettingsIcon />
                    </FooterItem>
                </>
            ) }
        </footer>
    )
}
export default Footer