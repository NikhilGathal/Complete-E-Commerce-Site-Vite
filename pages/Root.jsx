import React from 'react'
import Hero1 from '../components/Hero'
import Category from '../components/Category'
import TopProducts from '../components/TopProducts'
import Banner from '../components/Banner'
import Subscribe from '../components/Subscribe'
import Testimonials from '../components/Testimonial'
import Footer from '../components/Footer'
import { useOutletContext } from 'react-router-dom'

function Root() {
  const [setissign, dark, isdark, issign, userlogin] = useOutletContext()
  return (
    <>
      <Hero1 />
      <Category />
      <TopProducts />
      <Banner />
      <Subscribe />
      <Testimonials />
      <Footer dark={dark} />
    </>
  )
}

export default Root
