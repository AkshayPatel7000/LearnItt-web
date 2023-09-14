import React from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, PasswordIcon } from '../../../assets/icon/inputIcon'
import CustomButton from '../../../customComponents/button/customButton'
import CustomInput from '../../../customComponents/customTextInput'
import UnderLineText from '../../../customComponents/under-line-text/underLineText'
import CustomCard from '../../../customComponents/card/CustomCard';


export default function Reset() {
  const navigate = useNavigate(0)
  const onclick = () => {
    navigate("/")
  }
  return (
    <section>
      <UnderLineText text='Reset Password' subText='When an unknown printer took a galley of type and scrambled it to make a type specimen book.' />
      <CustomCard>
        <form>
          <CustomInput name="password" placeholder="Password" type="password" label="Password" lefticon={<PasswordIcon />} righticon={<EyeIcon />} />
          <CustomInput name="confirmpassword" placeholder="Confirm Password" type="password" label="Confirm Password" lefticon={<PasswordIcon />} righticon={<EyeIcon />} />
          <CustomButton title="Continue" onClick={onclick} />
          <br />
        </form>
      </CustomCard>
    </section>
  )
}
