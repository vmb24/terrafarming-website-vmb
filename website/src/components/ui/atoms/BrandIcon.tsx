import Link from 'next/link'
import Image from 'next/image'

export const BrandIcon = () => {
    return (
        <Link href='/'>
            <div className='items-center hidden lg:flex'>
                <Image src='/terrafarming-logo.svg' alt='logo' height={28} width={28}/>
            </div>
        </Link>
    )
}
