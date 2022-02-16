import { useState } from "react";
import { useRouter } from "next/router";
import { Dialog } from "@headlessui/react";

import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Input from "./shared/input";
import { supabase } from "../utils/supabaseClient";
const initialState = {
  name: "",
  email: "",
  password: "",
  day: "",
  month: "",
  year: "",
};
export default function SignUpModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(initialState);

  const [isNameFocus, setIsNameFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const [isYearFocus, setIsYearFocus] = useState(false);
  const [isMonthFocus, setIsMonthFocus] = useState(false);
  const [isDayFocus, setIsDayFocus] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({
      name: formData?.name,
      email: formData?.email,
      password: formData?.password,
      month: formData?.month,
      day: formData?.day,
      year: formData?.year,
    });
    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({
        name: formData?.name,
        email: formData?.email,
        password: formData?.password,
      })
      .eq("id", user.id);

    if (!updateError) {
      console.log(data);
      router.push("/timeline");
    } else {
      console.log(updateError);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-gray opacity-50" />

        <div className="relative text-textColor bg-black overflow-auto min-h-[400px] max-w-[600px] max-h-[90vh] mx-auto rounded-xl">
          <div className="flex h-[53px] p-[12px]">
            <button
              className="flex justify-center text-white hover:bg-[rgba(239,243,244,0.1)] hover:rounded-full w-[42px] h-[42px] items-center "
              onClick={onClose}
            >
              <FontAwesomeIcon className="m-[5px] text-[22px]" icon={faTimes} />
            </button>
            <FontAwesomeIcon className="m-auto text-[36px]" icon={faTwitter} />
          </div>
          <div className="mt-6">
            <div className="flex flex-col px-[32px] space-y-8 ">
              <span className="text-[24px] font-bold">Create your account</span>
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    name={"Name"}
                    type={"text"}
                    focus={isNameFocus}
                    handle={handleChange}
                    setFocus={setIsNameFocus}
                    data={formData?.name}
                  />
                  <Input
                    name={"Email"}
                    type={"email"}
                    focus={isEmailFocus}
                    handle={handleChange}
                    setFocus={setIsEmailFocus}
                    data={formData?.email}
                  />
                  <Input
                    name={"Password"}
                    type={"password"}
                    focus={isPasswordFocus}
                    handle={handleChange}
                    setFocus={setIsPasswordFocus}
                    data={formData?.password}
                  />
                  <div className="flex flex-col mb-14 ">
                    <span className="font-bold">Date of birth</span>
                    <span className="text-gray">
                      This will not be shown publicly. Confirm your own age,
                      even if this account is for a business, a pet, or
                      something else.
                    </span>
                    <div className="flex flex-row  mt-4 space-x-3 mb-8">
                      <div
                        className={`relative flex flex-col border ${
                          isMonthFocus ? "border-primary" : "border-gray"
                        } w-3/6 rounded-lg`}
                        onFocus={() => setIsMonthFocus(true)}
                        onBlur={() => setIsMonthFocus(false)}
                      >
                        <label
                          htmlFor="month"
                          className="flex w-full text-sm p-2"
                        >
                          <span
                            className={` my-[-4px] ${
                              isMonthFocus ? "text-primary" : "text-gray"
                            }`}
                          >
                            Month
                          </span>
                        </label>
                        <select
                          name="month"
                          id="month"
                          className="outline-none w-full bg-black pb-2 text-lg pl-1 rounded-md cursor-pointer"
                        >
                          <option value=""></option>
                          <option value="01">January</option>
                          <option value="02">February</option>
                          <option value="03">March</option>
                          <option value="04">April</option>
                          <option value="05">May</option>
                          <option value="06">June</option>
                          <option value="07">July</option>
                          <option value="08">August</option>
                          <option value="09">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                      </div>
                      <div
                        className={`relative flex flex-col border ${
                          isDayFocus ? "border-primary" : "border-gray"
                        } w-1/6 rounded-lg`}
                        onFocus={() => setIsDayFocus(true)}
                        onBlur={() => setIsDayFocus(false)}
                      >
                        <label
                          htmlFor="day"
                          className="flex w-full text-sm p-2"
                        >
                          <span
                            className={` my-[-4px] ${
                              isDayFocus ? "text-primary" : "text-gray"
                            }`}
                          >
                            Day
                          </span>
                        </label>
                        <select
                          name="day"
                          id="day"
                          className="outline-none w-full bg-black pb-2 text-lg pl-1 rounded-md cursor-pointer"
                        >
                          <option value=""></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                          <option value="29">29</option>
                          <option value="30">30</option>
                          <option value="31">31</option>
                        </select>
                      </div>
                      <div
                        className={`relative flex flex-col border ${
                          isYearFocus ? "border-primary" : "border-gray"
                        } w-2/6 rounded-lg`}
                        onFocus={() => setIsYearFocus(true)}
                        onBlur={() => setIsYearFocus(false)}
                      >
                        <label
                          htmlFor="year"
                          className="flex w-full text-sm p-2"
                        >
                          <span
                            className={` my-[-4px] ${
                              isYearFocus ? "text-primary" : "text-gray"
                            }`}
                          >
                            Year
                          </span>
                        </label>
                        <select
                          name="year"
                          id="year"
                          className="outline-none w-full bg-black pb-2 text-lg pl-1 rounded-md cursor-pointer"
                        >
                          <option value=""></option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                          <option value="2015">2015</option>
                          <option value="2014">2014</option>
                          <option value="2013">2013</option>
                          <option value="2012">2012</option>
                          <option value="2011">2011</option>
                          <option value="2010">2010</option>
                          <option value="2009">2009</option>
                          <option value="2008">2008</option>
                          <option value="2007">2007</option>
                          <option value="2006">2006</option>
                          <option value="2005">2005</option>
                          <option value="2004">2004</option>
                          <option value="2003">2003</option>
                          <option value="2002">2002</option>
                          <option value="2001">2001</option>
                          <option value="2000">2000</option>
                          <option value="1999">1999</option>
                          <option value="1998">1998</option>
                          <option value="1997">1997</option>
                          <option value="1996">1996</option>
                          <option value="1995">1995</option>
                          <option value="1994">1994</option>
                          <option value="1993">1993</option>
                          <option value="1992">1992</option>
                          <option value="1991">1991</option>
                          <option value="1990">1990</option>
                          <option value="1989">1989</option>
                          <option value="1988">1988</option>
                          <option value="1987">1987</option>
                          <option value="1986">1986</option>
                          <option value="1985">1985</option>
                          <option value="1984">1984</option>
                          <option value="1983">1983</option>
                          <option value="1982">1982</option>
                          <option value="1981">1981</option>
                          <option value="1980">1980</option>
                          <option value="1979">1979</option>
                          <option value="1978">1978</option>
                          <option value="1977">1977</option>
                          <option value="1976">1976</option>
                          <option value="1975">1975</option>
                          <option value="1974">1974</option>
                          <option value="1973">1973</option>
                          <option value="1972">1972</option>
                          <option value="1971">1971</option>
                          <option value="1970">1970</option>
                          <option value="1969">1969</option>
                          <option value="1968">1968</option>
                          <option value="1967">1967</option>
                          <option value="1966">1966</option>
                          <option value="1965">1965</option>
                          <option value="1964">1964</option>
                          <option value="1963">1963</option>
                          <option value="1962">1962</option>
                          <option value="1961">1961</option>
                          <option value="1960">1960</option>
                          <option value="1959">1959</option>
                          <option value="1958">1958</option>
                          <option value="1957">1957</option>
                          <option value="1956">1956</option>
                          <option value="1955">1955</option>
                          <option value="1954">1954</option>
                          <option value="1953">1953</option>
                          <option value="1952">1952</option>
                          <option value="1951">1951</option>
                          <option value="1950">1950</option>
                          <option value="1949">1949</option>
                          <option value="1948">1948</option>
                          <option value="1947">1947</option>
                          <option value="1946">1946</option>
                          <option value="1945">1945</option>
                          <option value="1944">1944</option>
                          <option value="1943">1943</option>
                          <option value="1942">1942</option>
                          <option value="1941">1941</option>
                          <option value="1940">1940</option>
                          <option value="1939">1939</option>
                          <option value="1938">1938</option>
                          <option value="1937">1937</option>
                          <option value="1936">1936</option>
                          <option value="1935">1935</option>
                          <option value="1934">1934</option>
                          <option value="1933">1933</option>
                          <option value="1932">1932</option>
                          <option value="1931">1931</option>
                          <option value="1930">1930</option>
                          <option value="1929">1929</option>
                          <option value="1928">1928</option>
                          <option value="1927">1927</option>
                          <option value="1926">1926</option>
                          <option value="1925">1925</option>
                          <option value="1924">1924</option>
                          <option value="1923">1923</option>
                          <option value="1922">1922</option>
                          <option value="1921">1921</option>
                          <option value="1920">1920</option>
                          <option value="1919">1919</option>
                          <option value="1918">1918</option>
                          <option value="1917">1917</option>
                          <option value="1916">1916</option>
                          <option value="1915">1915</option>
                          <option value="1914">1914</option>
                          <option value="1913">1913</option>
                          <option value="1912">1912</option>
                          <option value="1911">1911</option>
                          <option value="1910">1910</option>
                          <option value="1909">1909</option>
                          <option value="1908">1908</option>
                          <option value="1907">1907</option>
                          <option value="1906">1906</option>
                          <option value="1905">1905</option>
                          <option value="1904">1904</option>
                          <option value="1903">1903</option>
                          <option value="1902">1902</option>
                          <option value="1901">1901</option>
                          <option value="1900">1900</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-visible">
                    <button
                      className="py-2 px-6 mb-10 bg-textColor text-black rounded-full font-bold w-[536px] border-[1px] border-gray  transition duration-200 hover:bg-[rgb(200,200,200)]"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
