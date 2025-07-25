import React from 'react'
import PageContainer from '~/components/layouts/PageContainer'

const DetailEvent = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await params
    return (
        <PageContainer withNavbar withFooter className='h-screen'>Detail Event {slug}</PageContainer>
    )
}

export default DetailEvent