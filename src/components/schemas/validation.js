import * as Yup from "yup";

export const Part1Modal = Yup.object({
  subject: Yup.object().required("Subject is required ."),
  fa: Yup.number()
    .positive()
    .integer()
    .min(0, "Mark can't be less than Zero")
    .max(40, "You are exceeding full mark for this section")
    .required("Mandatary!"),
  o1: Yup.number()
    .positive()
    .integer()
    .min(0, "Mark can't be less than Zero")
    .max(10, "You are exceeding full mark for this section")
    .required("Mandatary!"),
  ba: Yup.number()
    .positive()
    .integer()
    .min(0, "Mark can't be less than Zero")
    .max(40, "You are exceeding full mark for this section")
    .required("Mandatary!"),
  o2: Yup.number()
    .positive()
    .integer()
    .min(0, "Mark can't be less than Zero")
    .max(10, "You are exceeding full mark for this section")
    .required("Mandatary!"),
});

export const Part2Modal = Yup.object({
  category: Yup.object().required("Select Category"),
  grade: Yup.object().required("Select Grade"),
});

export const Part3Modal = Yup.object({
  term: Yup.object().required("Please Select Term"),
  working: Yup.number()
    .positive()
    .integer()
    .min(0, "Days Required")
    .max(121, "A term has maximum 121 days")
    .required(" Please enter working days"),
  present: Yup.number()
    .positive()
    .integer()
    .min(0, "Days Required")
    .max(121, "A term has maximum 121 days")
    .required(" Please enter present days")
    .max(
      Yup.ref("working"),
      `Present Days Cannot be greater than working days`
    ),
});
export const studentValidation = Yup.object({
  student_name: Yup.string().required("Please enter the student name"),
  student_class: Yup.number()
    .min(1, "Minimum Standard must be atleast 1")
    .max(12, "There can be no Standard higher than 12")
    .required("Please enter the valid Class"),
  student_section: Yup.string()
    .max(1, "Please enter the valid section")
    .matches(/^[A-Z]+$/, "Standard must be in upper case Alphabet")
    .required("Please enter the valid Section"),
  student_roll: Yup.number()
    .min(1, "Minimum Roll number must be atleast 1")
    .max(200, "Entered role number is more than Students Strength")
    .required("Please enter the valid Roll number"),
});
