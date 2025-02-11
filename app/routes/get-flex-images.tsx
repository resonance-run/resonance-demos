import Entrata from '~/components/images/getflex/Entrata.png';
import Group1 from '~/components/images/getflex/Group-99081.png';
import Group2 from '~/components/images/getflex/Group-99082.png';
import SplitBill from '~/components/images/getflex/hero-splitbill.png';
import Image2 from '~/components/images/getflex/Image-2.png';
import Image3 from '~/components/images/getflex/Image-3.png';
import PMC from '~/components/images/getflex/PMC-building.png';
import RealPage from '~/components/images/getflex/RealPage-logo_OG.png';
import Resident from '~/components/images/getflex/Resident-avatar-3.png';
import SpotBills from '~/components/images/getflex/spot-bills.png';
import SpotFlexCard from '~/components/images/getflex/spot-flexcard.png';
import Calendar from '~/components/images/getflex/spot-startcalendar.png';
import Yardi from '~/components/images/getflex/Yardi.png';

export default function GetFlexImages() {
  return (
    <section className="flex flex-col items-center gap-8 bg-gray-600 p-12">
      <img src={Entrata} />
      <img src={Group1} />
      <img src={Group2} />
      <img src={SplitBill} />
      <img src={Image2} />
      <img src={Image3} />
      <img src={PMC} />
      <img src={RealPage} />
      <img src={Resident} />
      <img src={SpotBills} />
      <img src={SpotFlexCard} />
      <img src={Calendar} />
      <img src={Yardi} />
    </section>
  );
}
