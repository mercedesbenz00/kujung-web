import { OnlineHouse } from "./OnlineHouse";
import { Product } from "./Product";
import { ExpertHouse } from './ExpertHouse';
import { Catalog } from './Catalog';
import { Portfolio } from './Portfolio';
import { Certification } from './Certification';

interface ListRes<T> {
  items: T[];
}

export interface GlobalSearch {
  productList: ListRes<Product>;

  certificationList: ListRes<Certification>;

  catalogList: ListRes<Catalog>;

  sampleList: ListRes<Catalog>;

  lookBookList: ListRes<Catalog>;

  conventionList: ListRes<Portfolio>;

  artistList: ListRes<Portfolio>;

  brandList: ListRes<Portfolio>;

  onlineHouseList: ListRes<OnlineHouse>;

  expertHouseList: ListRes<ExpertHouse>;
}
