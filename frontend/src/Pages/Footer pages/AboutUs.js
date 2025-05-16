import { faAngleDown, faAngleRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Aboutus1 from '../../asset/Aboutus1.png';
import Aboutus2 from '../../asset/Aboutus2.jpeg';

function AboutUs() {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const faq = [
      {
          question: "Why choose Waltzify?",
          answer: "Our <strong>'Customer First Policy'</strong> ensures that all queries are handled seamlessly, providing customers with the best services and products. When it comes to refunds, we never hesitate, ensuring a hassle-free process. Our reliability is well-proven across various online platforms, where we’ve been delivering for the last <strong>15 years.</strong><br><br>Our website offers lower prices compared to other e-commerce platforms like Amazon and Flipkart. By shopping directly with us, you not only save more, but also enjoy the convenience of having a single, direct point of contact.<br><br>Whether you reach out via call, WhatsApp, or email, our team is always ready to assist. Choose Waltzify for an experience that’s affordable, reliable, and hassle-free!"
      },
      {
          question: "Can we visit your store?",
          answer: "Yes! We welcome you to visit our physical store located in Indore, Madhya Pradesh. Our team will be happy to assist you in person with your product needs. You can find us at :<br> <br>      Waltzer India<p>Main Gate, 1A-Balaji Market Hawa Bangala Rd,</p><p>Near R.R. Cat, Opp. Hari Dham Mandir,</p><p>Indore, Madhya Pradesh 452009</p><br>For any queries, feel free to contact us at :<br>Phone: 07314245858, 9522582422<br>Email: sales@waltzerindia.com."
      },
      {
          question: "Is international shipping available?",
          answer: "Yes! We offer international shipping to many countries. For international orders, feel free to contact us directly at 07314245858 | 9522582422 or email us at sales@waltzerindia.com for more details."
      },
      {
          question: "Can I place customized, bulk, or business orders?",
          answer: "Absolutely! We accept bulk and business orders, and offer special discounts specifically for these types of purchases. For customized orders, we are happy to offer personalized options to meet all your specific requirements.Just reach out to our customer support team, and we’ll provide tailored solutions to ensure your needs are fully met."
      },
      {
          question: "One contact point!",
          answer: "To make your shopping experience smoother, we provide a single point of contact for all your inquiries. Whether you need help with orders, products, or support, you can easily reach us through:<br><br><p>Phone: 07314245858, 9522582422<p><p>WhatsApp: Use the same numbers for quick communication.</p><p>Email: sales@waltzerindia.com</p><br><p>Our team is always ready to assist you, ensuring a hassle-free experience from start to finish.</p>"
      }
    ];

    return (
        <div className='pb-[3rem] mt-[32vw] lg:mt-[10vw] cursor-default'>
            {/* banner */}
            <div className='relative'>
                <p className='absolute z-10 text-white text-5xl lg:text-9xl left-[25%] top-[40%] lg:left-[35%] lg:top-[50%] font-bold'></p>
                <img className='w-full lg:h-[25rem]' src={Aboutus1} alt="" />
            </div>
            {/* content */}
            <div className='p-[3rem] flex flex-col lg:flex-row gap-[4rem]'>
                {/* para */}
                <div className='lg:w-2/3 flex flex-col gap-[2rem] text-sm lg:text-xl'>
                    <p className='text-6xl font-bold'>About Us</p>

                    <p className=' text-justify'>
                        Since our inception in 2010, <strong>Waltzer India</strong> has been dedicated to manufacturing, trading, distributing, wholesaling, and supplying a wide variety of <strong>Safety PPE</strong>, <strong>Industrial</strong>, <strong>Construction</strong>, and <strong>Home Improvement</strong> products. We pride ourselves on offering only the <strong>highest quality products
    </strong>, known for their optimum performance, <strong>high efficiency
    </strong>, <strong>sturdy construction
    </strong>, and <strong>long-lasting durability
    </strong>. Our modern approach to technology ensures excellence from production all the way to delivery.
                    </p>

                    <p className=' text-justify'>
                        In <strong>2015</strong>, we took a big step forward by expanding to e-commerce platforms like <strong>Amazon</strong> and <strong>Flipkart</strong>, making it easier for customers across India to access our trusted safety products. With over <span className='font-bold'>1,000,000 orders shipped</span>  and more than <span className='font-bold'>15,000+ happy customer reviews</span>, we proudly maintain an overall <span className='font-bold'>4-star rating on Amazon</span>.
                    </p>

                    <p className=' text-justify'>
                        Thanks to the continued support and encouragement of our customers, we are thrilled to announce the launch of our very <strong>own online store! Now as WALTZIFY</strong>, you can explore our complete range of products and enjoy a <strong>seamless shopping experience</strong> from the comfort of your home.
                    </p>

                    <p className=' text-justify'>
                        At <strong>Waltzify</strong>, we prioritize <strong>quality and customer satisfaction</strong>. We’re committed to not only meeting safety standards but also delivering products that offer superior comfort and reliability. Our online store is designed to make your shopping experience smooth, fast, and enjoyable, while providing the exceptional service you've come to expect from us.
                    </p>

                    <p className=' text-justify'>
                        Explore our online platform today and discover why <strong>Waltzify</strong> is a trusted leader for all your safety solutions!
                    </p>
                </div>
                {/* img */}
                <div className='lg:w-1/3'>
                    <img className='lg:mt-[10rem] lg:h-[100vh] rounded-xl' src={Aboutus2} alt="" />
                </div>
            </div>
            {/* FAQ */}
            <div className='px-[3rem]'>
                <p className='text-4xl py-[2rem] font-bold'>Frequently Asked Questions</p>
                <div className='lg:p-[2rem] relative h-[40rem] lg:h-[30rem]'>
                    {/* Questions */}
                    <div className='bg-white rounded-xl z-10 lg:w-[36rem] lg:my-[2rem] lg:ml-[10rem] flex flex-col shadow-xl'>
                        {faq.map((faq, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setActiveQuestion(index)}
                                onMouseLeave={() => setActiveQuestion(index)}
                                className={`flex flex-col items-start gap-[1rem] lg:px-[2rem] pt-[1rem] lg:py-[1.5rem] hover:bg-orange-500 bg-white hover:text-white text-orange-500 transition-all ease-in-out delay-100 text-sm font-bold justify-between`}
                            >
                                <div className={`flex items-center gap-[1rem] px-[2rem] w-full text-sm font-bold justify-between`}>
                                    <div className='flex items-center gap-[2rem]'>
                                        <FontAwesomeIcon icon={faCircle} />
                                        <p>{faq.question}</p>
                                    </div>
                                    <FontAwesomeIcon icon={activeQuestion === index ? faAngleDown : faAngleRight} />
                                </div>
                                <div className={`lg:hidden overflow-hidden transition-max-height duration-500 ease-in-out bg-gray-200 text-black w-full px-[2rem] ${activeQuestion === index ? 'max-h-[1000px] py-[1rem]' : 'max-h-0'}`}>
                                    {activeQuestion === index && (
                                        <>
                                            <p className='font-bold py-[1rem]'>{faq.question}</p>
                                            <p className='pb-[1rem]' dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Answers */}
                    <div className='hidden lg:block p-[3rem] lg:ml-[2rem] rounded-xl bg-gray-100 lg:absolute lg:w-[40rem] lg:h-[30rem] lg:-z-10 top-3 left-[45%]'>
                        <div
                            className={`lg:ml-[10rem] flex flex-col gap-[3rem] transition-opacity-transform ${
                                activeQuestion !== null ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'
                            }`}
                        >
                            {activeQuestion !== null && (
                                <>
                                    {/* <p className='font-bold'>{faq[activeQuestion].question}</p> */}
                                    <p dangerouslySetInnerHTML={{ __html: faq[activeQuestion].answer }}></p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
