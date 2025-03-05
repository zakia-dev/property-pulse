"use client";
import InfoBox from "./infoBox";
const InfoBoxes = () =>{
    return (
        <section>
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <InfoBox heading={'For Renters'} buttoninfo={{
                text: 'Browse Properties',
                link: '/properties',
                backgroundColor:'bg-black'
            }}>Find your dream rental property. Bookmark properties and contact
            owners</InfoBox>
            <InfoBox heading=' For Property Owners 'backgroundColor = 'bg-pink-100' buttoninfo={{
                text: 'Add Properties',
                link: '/properties/add',
                backgroundColor:'bg-pink-500'
            }}> List your properties and reach potential tenants. Rent as an
            airbnb or long term</InfoBox>
          </div>
        </div>
      </section>
    )
  }

export default InfoBoxes