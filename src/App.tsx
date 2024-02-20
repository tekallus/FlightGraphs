import React, { useState } from "react";
import { Card, Table, Row, Col, Input, Select, Button } from "antd";
import {
  CloseOutlined,
  MinusOutlined,
  BorderOutlined,
} from "@ant-design/icons";
//Burada, React ve useState gibi gerekli modülleri ve antd kütüphanesinden gerekli bileşenleri alıyoruz.

const { Option } = Select;
//Select bileşeninden Option bileşenini alıyoruz.

interface DataType {
  key: React.Key;
  item: string;
  category: string;
} //DataType adında bir interface tanımlıyoruz. Bu, her bir veri öğesinin veri yapısını tanımlıyor.

const columns = [
  {
    title: "Item",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
]; //Tablo sütunlarının yapılandırmasını tanımlıyoruz. Her sütunun başlığı (title), veri indeksi (dataIndex) ve benzersiz bir anahtar (key) içermesi gerekmektedir.

const initialData: DataType[] = [...Array(20)].map((_, index) => ({
  key: index,
  item: `Item ${index}`,
  category: `Category ${index % 5}`,
})); //Başlangıç verisini oluşturuyoruz. 20 öğe içeren bir dizi oluşturuyoruz ve her öğe, key (benzersiz kimlik), item (öğe adı) ve category (kategori adı) alanlarına sahip bir nesne olacak şekilde yapılandırıyoruz.

const App: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState<DataType[]>(initialData);
  const [favorites, setFavorites] = useState<DataType[]>([]);
  const [makeFavorite, setMakeFavorite] = useState(false); //useState hook'unu kullanarak bileşenin içinde kullanacağımız durumları tanımlıyoruz.
  //selectedRowKeys, seçilen satırların anahtarlarını içerir. data, tüm veri öğelerini içerir. favorites, favorilere eklenen öğeleri içerir.
  //makeFavorite, favori oluşturma işleminin durumunu içerir.

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.item === "Disabled User", // Column configuration not to be checked
    }),
  }; //Table bileşeninde kullanılacak olan seçim nesnesini tanımlıyoruz.
  //Bu nesne, seçilen satırların anahtarlarını izler ve onChange fonksiyonu ile güncellenir.
  //getCheckboxProps, her bir satır için özel checkbox özelliklerini belirtir ve 'Disabled User' olan satırların işaretlenmesini engeller.

  const handleCreateFavorite = () => {
    if (makeFavorite) {
      const newFavorites = data.filter((item) =>
        selectedRowKeys.includes(item.key)
      );
      setFavorites([...favorites, ...newFavorites]);
    }
  }; //Favori oluşturma işlevini tanımlıyoruz. Eğer makeFavorite true ise, seçilen satırlardan favorilere eklenmemiş olanları yeni favoriler listesine ekliyoruz.

  const handleDeleteFavorite = () => {
    const remainingFavorites = favorites.filter(
      (fav) => !selectedRowKeys.includes(fav.key)
    );
    setFavorites(remainingFavorites);
    setSelectedRowKeys([]); // Seçili öğeleri sıfırla
  }; //Favori silme işlevini tanımlıyoruz. Seçilen favori öğeleri hariç tutarak kalan favorileri alıyoruz ve favorileri güncelliyoruz. Ayrıca, seçili öğelerin anahtarlarını sıfırlıyoruz.

  const handleResetFavorites = () => {
    setFavorites([]);
  }; //Tüm favorileri sıfırlamak için bir işlev tanımlıyoruz.

  return (
    <div
      className="custom-window"
      style={{
        width: "100%",
        maxWidth: "960px",
        margin: "0 auto",
        border: "1px solid #ccc",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <div
        className="window-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h2 style={{ flex: 1 }}>Flight Graphs</h2>
        <Button icon={<MinusOutlined />} />
        <Button icon={<BorderOutlined />} />
        <Button icon={<CloseOutlined />} />
      </div>
      {/* Ant Design bileşenleriyle bir satır ve iki sütunlu bir layout oluşturuyoruz.*/}

      <Row gutter={16} style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
        <Col span={12} style={{ display: "flex", flexDirection: "column" }}>
          <Card style={{ flexGrow: 1, overflow: "auto" }}>
            <Input.Group compact>
              <label htmlFor="">Search:</label>
              <Input style={{ width: "calc(50% - 4px)", marginRight: "4px" }} />
              <Select defaultValue="" style={{ width: "30%" }}>
                <Option value="">Select Category</Option>
              </Select>
              <button>x</button>
            </Input.Group>
            {/* Ant Design bileşenleriyle bir satır ve iki sütunlu bir layout oluşturuyoruz.*/}
            <Table
              rowKey="key"
              columns={columns}
              dataSource={data}
              pagination={false}
              rowSelection={rowSelection}
              scroll={{ y: 240 }}
            />
          {/* Favori oluşturma işlevi */}</Card>
          <div style={{ marginTop: "20px" }}>
            <Button
              type="primary"
              style={{ marginRight: "8px" }}
              onClick={handleCreateFavorite}
            >
              Create
            </Button>
            {/* Favori oluşturma onay kutusu */}<input
              type="checkbox"
              checked={makeFavorite}
              onChange={(e) => setMakeFavorite(e.target.checked)}
              style={{ flex: 1, marginRight: "8px" }}
            />
            <label htmlFor="checkbox">Make Favorite</label>
          </div>
        </Col>
        {/* Sağ Taraftaki İçerik */}
      <Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Sağ tarafın içeriği */}
        <Card title="Favorites" style={{ flexGrow: 1 }}>
          {/* Favori öğelerin listesi */}
          <Table rowKey="key" columns={columns} dataSource={favorites} pagination={false} rowSelection={rowSelection} scroll={{ y: 240 }} />
        </Card>
        {/* Favori öğeleriyle ilgili işlevler */}
        <div style={{ marginTop: '20px' }}>
          {/* Favori öğeleri silme düğmesi */}
          <Button type="primary" style={{ marginRight: '8px' }} onClick={handleDeleteFavorite}>Delete Favorite</Button>
          {/* Tüm favorileri sıfırlama düğmesi */}
          <Button type="primary" style={{ marginRight: '8px' }} onClick={handleResetFavorites}>Reset Favorites</Button>
        </div>
      </Col>
    </Row>
  </div>
)
      }
export default App;