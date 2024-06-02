import NavM from "@/components/NavM";
import AddNew from "@/components/addButton";
import Circle from "@/components/circle";

export default function Home() {

  return (
    <>
      <NavM />
      {/* lu9e3OLNVoGS2i7PJaEvOw==csTLZjC3ImTQOxZH */}

      <div className="grid grid-cols-2">
        <div className="border-2 border-bg-white">
          <Circle value={99} />
        </div>
        <div className="border-2 border-bg-white">total all consumed</div>
        <div className="border-2 border-bg-white">
          <AddNew />
        </div>
        <div className="border-2 border-bg-white">helo</div>
      </div>
      {/* 
      
      */}
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}

      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("meal", { required: true })} className="border-2 text-black" /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.meal && <span>This field is required</span>} */}

      {/* <input type="submit" className="border-2 text-yellow-50" /> */}
      {/* </form> */}
    </>
  );
}
