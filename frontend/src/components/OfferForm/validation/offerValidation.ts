import { OfferType } from '@/enums/OfferType';
import { Category } from '@/models/Category';
import * as Yup from 'yup';

export const offerValidation = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(25, "Title must not exceed 25 characters")
    .required("Title is required"),
  shortDescription: Yup.string()
    .min(3, "Short description must be at least 3 characters")
    .max(50, "Short description must not exceed 50 characters")
    .required("Short description is required"),
  price: Yup.number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  longDescription: Yup.string()
    .min(3, "Long description must be at least 3 characters")
    .max(150, "Long description must not exceed 150 characters"),
  location: Yup.string()
    .min(3, "Location  must be at least 3 characters")
    .max(25, "Location must not exceed 25 characters"),
  offerType: Yup.string().oneOf([
    OfferType.PURCHASE_OFFER,
    OfferType.SELL_OFFER,
  ]),
  categories: Yup.array()
    .of(Yup.object().shape(<Category>{}))
    .required("Add at least one category"),
});
