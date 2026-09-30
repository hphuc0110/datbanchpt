export type NewsBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "features"; items: { title: string; body: string }[] }
  | { type: "columns"; items: { title: string; points: string[] }[] }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | { type: "contact" };

export const NEWS_BODIES: Record<string, NewsBlock[]> = {
  "cua-long-thuong-hai-la-gi": [
    {
      type: "p",
      text: "Mỗi độ thu về, cua lông lại trở thành một trong những nguyên liệu được nhắc đến nhiều trong đời sống ẩm thực Trung Hoa. Đặc biệt tại Thượng Hải và vùng Giang Nam, mùa cua lông được xem như một thời điểm đáng mong đợi trong năm, khi những con cua trưởng thành đạt độ béo và hương vị đặc trưng.",
    },
    {
      type: "p",
      text: "Vậy cua lông Thượng Hải là gì, có nguồn gốc từ đâu, vì sao lại nổi tiếng và mùa nào là thời điểm thích hợp để thưởng thức? Cùng Cung Hỷ Phát Tài tìm hiểu về loại cua đặc biệt này.",
    },
    { type: "h2", text: "Cua lông Thượng Hải là gì?" },
    {
      type: "p",
      text: "Tên gọi “cua lông” bắt nguồn từ đặc điểm rất dễ nhận biết: phần càng và chân cua có những cụm lông màu nâu sẫm, tạo nên vẻ ngoài khác biệt so với nhiều loại cua biển quen thuộc.",
    },
    {
      type: "p",
      text: "Khác với các loại cua biển, kích thước cua lông thường không quá lớn. Điểm được thực khách quan tâm nhiều hơn nằm ở thịt cua, phần gạch và chất lượng của từng con cua, đặc biệt khi cua bước vào mùa thu hoạch.",
    },
    {
      type: "p",
      text: "Trong đó, cua lông hồ Dương Trừng thuộc Giang Tô là một trong những dòng cua lông nổi tiếng nhất. Khu vực Dương Trừng nằm gần Tô Châu và có mối liên hệ lâu đời với văn hóa thưởng thức cua của vùng Thượng Hải – Giang Nam.",
    },
    { type: "h2", text: "Vì sao gọi là “cua lông Thượng Hải”?" },
    {
      type: "p",
      text: "Trong thực tế, cua lông được nuôi và khai thác tại nhiều vùng thuộc hệ thống sông hồ Trung Quốc, trong đó cua Dương Trừng ở tỉnh Giang Tô là một cái tên nổi tiếng.",
    },
    {
      type: "p",
      text: "Lý do tên gọi gắn liền với Thượng Hải là vì Hồ Dương Trừng nằm cách Thượng Hải khoảng 70km. Từ xưa, Thượng Hải là cảng biển lớn và trung tâm phân phối hàng hóa hàng đầu khu vực. Cua từ các vùng Giang Nam lân cận đều được tập kết về đây để tiêu thụ và xuất đi các nơi.",
    },
    {
      type: "p",
      text: "Hơn nữa, người nước ngoài và thương gia khi đến Thượng Hải thưởng thức món cua này đã gọi nó theo tên thành phố cảng nổi tiếng mà họ ghé thăm. Dần dần, cái tên “cua lông Thượng Hải” trở nên phổ biến.",
    },
    { type: "h2", text: "Cua lông Thượng Hải có đặc điểm gì?" },
    {
      type: "p",
      text: "Điểm nhận biết đầu tiên của cua lông chính là lớp lông đặc trưng trên càng. Về hình dáng, cua thường có mai màu xanh xám hoặc xanh sẫm, phần chân tương đối mảnh và càng phủ lông. Kích thước không quá lớn nhưng cấu trúc cơ thể chắc gọn.",
    },
    {
      type: "p",
      text: "Điều làm nên sức hấp dẫn của cua lông lại nằm nhiều hơn ở hương vị. Thịt cua có độ mềm, ngọt và thanh. Phần gạch cua mang vị béo đặc trưng, thường là yếu tố khiến cua lông được yêu thích trong mùa thu. Cua lông không chỉ được thưởng thức nguyên con mà còn được sử dụng để tạo nên nhiều món ăn khác nhau từ thịt và gạch cua.",
    },
    {
      type: "p",
      text: "Đây cũng là lý do cua lông xuất hiện trong nhiều món ăn của ẩm thực Thượng Hải và vùng Giang Nam, từ cua hấp truyền thống đến các món mì, bánh bao, cơm và những món có sử dụng phần gạch cua làm thành phần chính.",
    },
    { type: "h2", text: "Cua lông Thượng Hải mùa nào ngon?" },
    {
      type: "p",
      text: "Mùa thu hoạch cua lông thường kéo dài từ tháng 9 – 12 dương lịch. Tuy nhiên, để thưởng thức những con cua béo ngậy và nhiều gạch nhất, thời điểm vàng thường được nhắc đến là khoảng tháng 10 và tháng 11.",
    },
    {
      type: "p",
      text: "Trong văn hóa thưởng cua Trung Hoa, tháng 9 âm lịch thường được nhắc đến với cua cái, trong khi tháng 10 âm lịch là thời điểm được nhắc đến nhiều khi thưởng cua đực. Giới sành ăn Trung Hoa luôn nằm lòng câu khẩu quyết: “Tháng 9 âm lịch ăn cua cái, tháng 10 âm lịch ăn cua đực”. Mỗi thời điểm trong mùa sẽ mang đến một trải nghiệm hương vị khác biệt.",
    },
    {
      type: "table",
      headers: [
        "Thời điểm (dương lịch)",
        "Loại cua nên chọn",
        "Đặc điểm hương vị nổi bật",
      ],
      rows: [
        [
          "Tháng 9 – tháng 10",
          "Cua cái",
          "Phần gạch cua vàng óng, kết đặc, béo ngậy đậm đà.",
        ],
        [
          "Tháng 10 – tháng 11",
          "Cua đực",
          "Lớp cao cua (tinh sữa) dẻo quánh, dính răng, thịt cua ngọt thanh đỉnh cao.",
        ],
      ],
    },
    { type: "h2", text: "Thưởng thức cua lông Thượng Hải tại Cung Hỷ Phát Tài" },
    {
      type: "p",
      text: "Mùa cua lông là thời điểm đặc biệt để khám phá những hương vị mang dấu ấn Thượng Hải và vùng Giang Nam.",
    },
    {
      type: "p",
      text: "Tại Cung Hỷ Phát Tài, cua được nhập mới, tuyển chọn kỹ lưỡng từng con, đảm bảo độ tươi sống, phần thịt chắc và tỷ lệ gạch đầy đặn, chế biến nhiều cách khác nhau theo phong cách đặc trưng của ẩm thực Trung Hoa. Từ phần thịt cua thanh ngọt đến phần gạch béo thơm, mỗi nguyên liệu được xử lý cẩn thận để giữ được hương vị vốn có.",
    },
    {
      type: "p",
      text: "Nếu đang tìm kiếm một địa điểm để thưởng thức cua lông Thượng Hải tại Hà Nội, Cung Hỷ Phát Tài là điểm đến phù hợp cho hành trình khám phá mỹ vị mùa thu. Không gian sang trọng, ấm cúng, cùng cách phục vụ chu đáo, phù hợp cho những buổi dùng bữa cùng gia đình, gặp gỡ bạn bè hay tiếp đãi đối tác.",
    },
    { type: "contact" },
  ],

  "nguon-goc-cua-long-ho-duong-trung": [
    {
      type: "p",
      text: "Khám phá cái nôi của cua lông hồ Dương Trừng và cách giới sành ăn nhận biết cua chuẩn gốc qua tiêu chuẩn “Tứ đại đặc trưng”.",
    },
    { type: "h2", text: "1. Cua lông có nguồn gốc từ đâu? Cái nôi hồ Dương Trừng" },
    {
      type: "p",
      text: "Cua lông là tên gọi phổ biến của 中华绒螯蟹 – Eriocheir sinensis, một loài cua nước ngọt phân bố tại nhiều khu vực của Trung Quốc. Trong số các vùng nuôi và sản xuất cua lông, hồ Dương Trừng là địa danh đặc biệt nổi tiếng, gắn liền với thương hiệu Yangcheng Lake Hairy Crabs.",
    },
    {
      type: "p",
      text: "Đối với người sành ăn trên khắp thế giới, cua lông là biểu tượng đỉnh cao của phong vị mùa thu. Câu hỏi phổ biến nhất của thực khách lần đầu tìm hiểu luôn là: “Cua lông ở đâu ngon nhất?”. Câu trả lời bất di bất dịch của các đại sư ẩm thực chính là hồ Dương Trừng.",
    },
    {
      type: "p",
      text: "Hồ Dương Trừng là hồ nước ngọt rộng hơn 117 km², nằm giữa ranh giới thành phố Tô Châu và Côn Sơn, chỉ cách Thượng Hải khoảng 1 giờ di chuyển. Tên tuổi của vùng cua này đã được xây dựng qua nhiều năm, đến mức “cua lông Dương Trừng” trở thành một tên gọi quen thuộc khi nhắc đến những sản vật mùa thu của Trung Hoa.",
    },
    { type: "h2", text: "2. Vì sao cua lông hồ Dương Trừng nổi tiếng?" },
    {
      type: "p",
      text: "Sự nổi tiếng của cua lông Dương Trừng đến từ sự kết hợp giữa điều kiện sinh thái, phương thức nuôi và lịch sử phát triển thương hiệu.",
    },
    {
      type: "p",
      text: "Hồ Dương Trừng có môi trường nước phù hợp cho quá trình sinh trưởng và nuôi dưỡng cua lông, với hệ thống thủy thực vật và nguồn thức ăn tự nhiên phong phú. Các tài liệu địa phương ghi nhận đáy hồ có nhiều sỏi đá và vỏ ốc cứng chứ không phải bùn lầy, nước hồ trong veo, có tính kiềm nhẹ và thảm thực vật thủy sinh phong phú. Đây là nguồn thức ăn tự nhiên dồi dào gồm tôm nhỏ, ốc nước ngọt và tảo bẹ, giúp cua lông tích tụ lượng dưỡng chất và khối gạch vàng óng không nơi nào sánh bằng.",
    },
    {
      type: "p",
      text: "Cua Dương Trừng vì thế thường được mô tả với phần thịt chắc, vị tươi ngọt, và phần gạch cua cái phát triển rõ khi bước vào mùa thưởng thức.",
    },
    {
      type: "h2",
      text: "3. “Tứ đại đặc trưng” phân biệt cua lông hồ Dương Trừng chính gốc",
    },
    {
      type: "p",
      text: "Bởi giá trị được nhắc đến rất cao, trên thị trường hiện nay xuất hiện nhiều loại cua lông nuôi từ các hồ nước khác như Thái Hồ, Hồng Trạch Hồ, hay cua không rõ nguồn gốc mang tên cua Dương Trừng.",
    },
    {
      type: "p",
      text: "Tại nhà hàng Cung Hỷ Phát Tài, bếp trưởng Lê Đình Mạnh trực tiếp kiểm định từng lô cua lông nhập khẩu sống thông qua 4 tiêu chí được gọi là “Tứ đại đặc trưng”.",
    },
    {
      type: "features",
      items: [
        {
          title: "Thanh Bối – 青背: Mai xanh",
          body: "Mai cua lông Dương Trừng có màu xanh ngọc bích ánh xám, bề mặt láng bóng như phủ men ngọc, các gai viền mai sắc nét, không bị ố vàng hay bám phèn bùn. Đây là đặc điểm đầu tiên thường được nhắc tới khi nhận diện cua Dương Trừng.",
        },
        {
          title: "Bạch Đỗ – 白肚: Bụng trắng",
          body: "Nhờ đáy hồ bằng cát sỏi sạch sẽ, bụng cua lông hồ Dương Trừng có màu trắng ngà tinh khiết, bóng mượt, không có vệt ố xám hay đen của bùn đất tù đọng.",
        },
        {
          title: "Kim Trảo – 金爪: Chân vàng",
          body: "Tám chiếc chân cua khỏe khoắn, phần chân và càng có sắc vàng đặc trưng, có khả năng chống đỡ cơ thể tốt. Khi đặt cua trên mặt kính, cua có thể chống chân và di chuyển linh hoạt.",
        },
        {
          title: "Hoàng Mao – 黄毛: Lông vàng",
          body: "Càng cua và viền chân phủ lớp lông tơ màu nâu hung vàng óng ả, lông mọc dày dặn, dựng đứng tự nhiên, mềm mượt chứ không thô ráp hay đen xỉn. Phần lông này là đặc điểm dễ phân biệt với những loại cua thông thường khác.",
        },
      ],
    },
    { type: "h2", text: "4. Mùa cua lông Dương Trừng vào thời điểm nào?" },
    {
      type: "p",
      text: "Cua lông thường được nhắc đến như một thức vị đặc trưng của mùa thu Trung Quốc. Đây cũng là thời điểm cua bước vào giai đoạn được thực khách chờ đợi nhất trong năm.",
    },
    {
      type: "p",
      text: "Truyền thống ẩm thực Trung Hoa lưu truyền quan niệm thưởng cua cái vào tháng 9 âm lịch và cua đực vào tháng 10 âm lịch, khi phần gạch và thịt đạt độ ngon được mong đợi.",
    },
    {
      type: "p",
      text: "Tuy nhiên, thời điểm khai thác và chất lượng cua thực tế có thể thay đổi theo năm, điều kiện thời tiết và quy định của địa phương. Vì vậy, khi tìm mua hoặc thưởng thức cua lông theo mùa, nên kiểm tra thông tin mùa vụ cụ thể của từng năm.",
    },
    { type: "h2", text: "5. Thưởng thức cua lông tại Cung Hỷ Phát Tài" },
    {
      type: "p",
      text: "Mùa cua lông là thời điểm thích hợp để khám phá những món ăn mang dấu ấn Thượng Hải và vùng Giang Nam.",
    },
    {
      type: "p",
      text: "Tại Cung Hỷ Phát Tài, cua được nhập mới, tuyển chọn kỹ lưỡng từng con, đảm bảo độ tươi sống, phần thịt chắc và tỷ lệ gạch đầy đặn, chế biến nhiều cách khác nhau theo phong cách đặc trưng của ẩm thực Trung Hoa. Từ phần thịt cua thanh ngọt đến phần gạch béo thơm, mỗi nguyên liệu được xử lý cẩn thận để giữ được hương vị vốn có.",
    },
    {
      type: "p",
      text: "Nếu muốn tìm một địa chỉ thưởng thức cua lông Thượng Hải tại Hà Nội, thực khách có thể ghé Cung Hỷ Phát Tài tại 47–51 Cửa Bắc, Ba Đình, Hà Nội. Không gian nhà hàng phù hợp cho những buổi dùng bữa cùng gia đình, gặp gỡ bạn bè hoặc những dịp muốn thưởng thức các món ăn mang phong vị Trung Hoa.",
    },
    { type: "contact" },
  ],

  "mua-cua-long-cuu-thu-thap-hung": [
    {
      type: "p",
      text: "Mùa cua lông gắn liền với tiết trời mùa thu, khi cua bước vào giai đoạn phát triển mạnh về thịt và tuyến sinh dục. Tìm hiểu thời điểm thưởng cua cái, cua đực ngon nhất và cách phân biệt hai loại cua này.",
    },
    {
      type: "h2",
      text: "1. Mùa cua lông vào tháng mấy? Giải mã quy tắc “Cửu thư thập hùng”",
    },
    {
      type: "p",
      text: "Nếu đang tìm hiểu mùa cua lông vào tháng mấy, bạn sẽ thường bắt gặp một câu nói quen thuộc trong văn hóa ẩm thực Trung Hoa: “九雌十雄” – Cửu thư thập hùng.",
    },
    {
      type: "p",
      text: "“Cửu thư” chỉ tháng 9 âm lịch thưởng cua cái, còn “thập hùng” chỉ tháng 10 âm lịch thưởng cua đực. Đây là kinh nghiệm thưởng cua được lưu truyền từ lâu và cũng xuất hiện trong các tư liệu giới thiệu về cua Dương Trừng.",
    },
    {
      type: "p",
      text: "Điều này không có nghĩa cua cái chỉ ngon trong tháng 9 hay cua đực chỉ có thể thưởng thức vào tháng 10. Cách nói “Cửu thư thập hùng” chủ yếu phản ánh thời điểm tuyến sinh dục của cua cái và cua đực lần lượt phát triển đến giai đoạn được ưa chuộng nhất.",
    },
    {
      type: "p",
      text: "Vào khoảng tháng 9 âm lịch, cua cái thường được thực khách mong đợi bởi phần gạch cua phát triển rõ, có màu vàng cam sau khi hấp chín, vị béo và đậm. Đây cũng là lý do cua cái thường được nhắc đến trước trong câu “Cửu thư thập hùng”. Tư liệu về cua Dương Trừng ghi nhận tháng 9 âm lịch là thời điểm cua cái có phần gạch đầy và thịt ngon.",
    },
    {
      type: "p",
      text: "Sang tháng 10 âm lịch, cua đực bước vào thời điểm phát triển mạnh, phần được thực khách chờ đợi đạt độ sánh đặc. Sau khi chế biến, phần này có màu trắng ngà đến trắng đục và tạo cảm giác béo, thơm đặc trưng. Các tư liệu về cua Dương Trừng cũng ghi nhận tháng 10 âm lịch là thời điểm cua đực phát triển tốt, phần thịt ở chân và càng đầy đặn hơn.",
    },
    { type: "h2", text: "2. Vì sao mùa thu được xem là mùa thưởng cua lông?" },
    {
      type: "p",
      text: "Cua lông là loài cua nước ngọt có chu kỳ sinh trưởng gắn với sự thay đổi của môi trường theo mùa. Khi mùa thu đến, cua bước vào giai đoạn tích lũy và hoàn thiện về thịt cũng như tuyến sinh dục.",
    },
    {
      type: "p",
      text: "Đây là lý do mùa cua lông thường gắn với khoảng thời gian từ mùa thu đến đầu mùa đông, thay vì kéo dài quanh năm với chất lượng đồng đều.",
    },
    { type: "h2", text: "3. Cua lông đực và cái khác nhau thế nào?" },
    {
      type: "p",
      text: "Ngoài thời điểm thưởng thức, việc phân biệt cua lông đực và cua cái cũng là một phần của văn hóa thưởng cua. Cách đơn giản nhất là quan sát phần yếm cua ở mặt bụng.",
    },
    {
      type: "columns",
      items: [
        {
          title: "Cua cái",
          points: [
            "Thường có yếm hình tròn hoặc bầu dục để che chở và chứa trứng, gạch son.",
            "Vào mùa sinh sản, phần yếm này sẽ phồng to rõ rệt.",
          ],
        },
        {
          title: "Cua đực",
          points: [
            "Yếm nhỏ và hẹp, có hình tam giác nhọn.",
            "Phần yếm khít chặt vào phần bụng và không phồng to.",
          ],
        },
      ],
    },
    {
      type: "p",
      text: "Ngoài ra, cua đực có kích thước lớn hơn và phần càng, chân phát triển khỏe. Càng của cua đực thường to hơn và lớp lông bao quanh càng rậm rạp, khỏe khoắn hơn cua cái.",
    },
    { type: "h2", text: "4. Cách chọn cua lông tươi ngon" },
    {
      type: "p",
      text: "Bên cạnh mùa vụ, độ tươi sống là yếu tố quan trọng khi thưởng thức cua lông.",
    },
    {
      type: "p",
      text: "Cua còn khỏe thường có phản ứng rõ khi chạm nhẹ vào mắt, chân và càng hoạt động tốt, có khả năng bám và di chuyển. Ngoài ra, có thể quan sát thêm phần mai, bụng, chân và lông cua. Với cua Dương Trừng, những đặc điểm thường được nhắc đến gồm mai xanh, bụng trắng, chân vàng và lông vàng.",
    },
    { type: "h2", text: "5. Thưởng thức cua lông tại Cung Hỷ Phát Tài" },
    {
      type: "p",
      text: "Mùa cua lông là thời điểm thích hợp để khám phá những món ăn mang dấu ấn Thượng Hải và vùng Giang Nam.",
    },
    {
      type: "p",
      text: "Tại Cung Hỷ Phát Tài, cua được nhập mới, tuyển chọn kỹ lưỡng từng con, đảm bảo độ tươi sống, phần thịt chắc và tỷ lệ gạch đầy đặn, chế biến nhiều cách khác nhau theo phong cách đặc trưng của ẩm thực Trung Hoa. Từ phần thịt cua thanh ngọt đến phần gạch béo thơm, mỗi nguyên liệu được xử lý cẩn thận để giữ được hương vị vốn có.",
    },
    {
      type: "p",
      text: "Nếu đang tìm kiếm địa chỉ thưởng thức cua lông Thượng Hải tại Hà Nội, thực khách có thể ghé Cung Hỷ Phát Tài tại 47–51 Cửa Bắc, Ba Đình, Hà Nội, nơi phục vụ các món ăn mang phong vị Trung Hoa trong không gian sang trọng, ấm cúng cho những buổi gặp gỡ gia đình, bạn bè hoặc tiếp đãi đối tác.",
    },
    { type: "contact" },
  ],

  "mi-cua-long-thuong-hai-la-gi": [
    {
      type: "p",
      text: "Mì cua lông Thượng Hải là một trong những món ăn được nhắc đến nhiều mỗi khi mùa cua lông trở lại. Không giống những món mì sử dụng nước dùng làm điểm nhấn, món mì này tập trung vào chính phần thịt, gạch và phần cua được chế biến cô đọng, phủ lên những sợi mì dai mềm.",
    },
    {
      type: "p",
      text: "Một bát mì tưởng như đơn giản nhưng phía sau lại là khá nhiều công đoạn: từ lựa chọn cua, hấp chín, tách thịt và gạch đến xử lý phần cua sao cho giữ được vị ngọt tự nhiên, độ béo đặc trưng mà không lấn át hương vị của mì.",
    },
    {
      type: "p",
      text: "Vậy mì cua lông Thượng Hải là gì, món ăn này có gì đặc biệt và vì sao thường có giá cao hơn những món mì thông thường? Cùng khám phá nguồn gốc, nguyên liệu, hương vị và cách thưởng thức món ăn đặc trưng này.",
    },
    { type: "h2", text: "1. Mì cua lông Thượng Hải là gì?" },
    {
      type: "p",
      text: "Mì cua lông Thượng Hải thường được gọi là 蟹粉面 (xièfěn miàn) hoặc 蟹粉拌面 (xièfěn bàn miàn). Đây là món mì kết hợp giữa mì và phần cua đã được tách nhỏ, chủ yếu gồm thịt cua và gạch cua, sau đó chế biến thành phần xốt hoặc phần phủ để ăn cùng mì.",
    },
    {
      type: "p",
      text: "Điểm dễ nhận thấy nhất của món ăn nằm ở phần cua. Thay vì để nguyên miếng cua như những món cua hấp, cua được xử lý và cô đọng thành phần phủ có màu vàng cam đặc trưng. Khi trộn cùng mì, phần cua bám đều vào sợi, tạo nên vị ngọt của thịt cua, độ béo của gạch và hương thơm đặc trưng của cua lông.",
    },
    {
      type: "p",
      text: "Đây cũng là lý do mì cua lông không đơn thuần là mì thêm thịt cua. Phần cua mới là yếu tố tạo nên bản sắc của món ăn, còn sợi mì đóng vai trò làm nền để hương vị ấy được thể hiện rõ hơn.",
    },
    {
      type: "p",
      text: "Tại Thượng Hải, mì cua lông thường được thưởng thức vào mùa cua, đặc biệt trong những tháng mùa thu khi cua lông bước vào thời điểm được yêu thích nhất trong năm.",
    },
    { type: "h2", text: "2. Mì cua lông Thượng Hải có nguồn gốc từ đâu?" },
    {
      type: "p",
      text: "Mì cua lông gắn với văn hóa thưởng thức cua của vùng Giang Nam và khu vực quanh hạ lưu sông Dương Tử, trong đó Thượng Hải là một địa danh nổi bật.",
    },
    {
      type: "p",
      text: "Cua lông Trung Quốc, thường được biết đến với tên Chinese mitten crab, là một sản vật gắn với vùng sông hồ phía đông Trung Quốc. Cứ khi mùa thu đến, những món ăn từ cua lại trở thành một phần đáng chú ý trong đời sống ẩm thực địa phương.",
    },
    {
      type: "p",
      text: "Từ cách thưởng thức cua nguyên con, người đầu bếp dần phát triển nhiều món ăn sử dụng thịt và gạch cua làm nguyên liệu riêng. Trong đó, phần thịt và gạch cua đã được tách, chế biến, trở thành nguyên liệu quan trọng trong nhiều món ăn của vùng Thượng Hải và Giang Nam.",
    },
    {
      type: "p",
      text: "Mì cua chính là một cách thưởng thức như vậy: thay vì thưởng thức cua nguyên con, phần thịt và gạch được tách riêng, xử lý thành phần cua đậm vị rồi kết hợp cùng mì.",
    },
    {
      type: "p",
      text: "Điều này cũng giải thích vì sao món mì thường được nhắc đến cùng mùa cua. Đây không phải loại mì có thể giữ nguyên chất lượng nguyên liệu quanh năm như nhiều món mì phổ biến khác, mà gắn với thời điểm cua đạt độ được ưa chuộng trong năm.",
    },
    { type: "h2", text: "3. Mì cua lông Thượng Hải có hương vị như thế nào?" },
    {
      type: "p",
      text: "Điểm đặc biệt của mì cua lông nằm ở độ cô đọng của hương vị cua. Khác với món mì nước, người ăn không tìm kiếm một phần nước dùng nhiều tầng vị. Thay vào đó, ngay từ khi trộn mì, phần thịt và gạch cua đã bao phủ lấy sợi mì.",
    },
    {
      type: "p",
      text: "Vị đầu tiên thường là vị ngọt tự nhiên của thịt cua, sau đó là độ béo và đậm của gạch cua. Khi phần cua được chế biến kỹ, hương thơm của cua trở nên rõ ràng hơn mà vẫn giữ được sự thanh ngọt vốn có.",
    },
    {
      type: "p",
      text: "Sợi mì dai mềm tạo sự cân bằng về kết cấu. Khi phần cua bám đều lên mì, một đũa ăn sẽ có đủ độ mềm của sợi mì, vị ngọt của thịt cua và độ béo đặc trưng từ phần gạch.",
    },
    { type: "h2", text: "4. Vì sao mì cua lông Thượng Hải thường có giá cao?" },
    {
      type: "p",
      text: "Nhìn một bát mì cua lông, nhiều người có thể thắc mắc vì sao món ăn này thường có mức giá cao hơn đáng kể so với những món mì thông thường.",
    },
    {
      type: "p",
      text: "Lý do đầu tiên nằm ở nguyên liệu. Cua lông là sản vật theo mùa, và chất lượng cua thay đổi theo thời điểm trong năm. Khi vào mùa, cua trở thành một trong những nguyên liệu được người yêu ẩm thực tại Thượng Hải mong đợi.",
    },
    {
      type: "p",
      text: "Lý do thứ hai là phần thịt và gạch cua phải được tách riêng. Đây là công đoạn tốn nhiều thời gian. Sau khi hấp, người đầu bếp phải xử lý từng con cua, lấy phần thịt ở thân và chân, đồng thời tách phần gạch để chế biến. Với những món sử dụng lượng cua lớn cho một phần mì, công đoạn này càng trở nên đáng kể.",
    },
    {
      type: "p",
      text: "Ngoài nguyên liệu, kỹ thuật xử lý phần cua cũng ảnh hưởng đến chất lượng món ăn. Cua cần được chế biến sao cho phần thịt vẫn giữ độ ngọt, gạch giữ được độ béo và toàn bộ phần cua có thể quyện cùng mì mà không trở nên quá dầu hoặc nặng vị.",
    },
    {
      type: "p",
      text: "Vì vậy, giá trị của mì cua lông không chỉ nằm ở một bát mì thành phẩm, mà còn nằm ở lượng nguyên liệu và công sức được sử dụng trước khi món ăn được đưa lên bàn.",
    },
    { type: "h2", text: "5. Mùa nào thích hợp để thưởng thức mì cua lông?" },
    {
      type: "p",
      text: "Mì cua lông thường được gắn với mùa cua vào mùa thu và đầu đông.",
    },
    {
      type: "p",
      text: "Trong văn hóa thưởng cua Trung Quốc có quy tắc “Cửu thư thập hùng”, thường được hiểu là tháng 9 âm lịch thưởng cua cái, tháng 10 âm lịch thưởng cua đực. Đây là cách nói mang tính kinh nghiệm theo mùa, chứ không phải một ranh giới tuyệt đối áp dụng cho mọi năm và mọi vùng cua.",
    },
    {
      type: "p",
      text: "Với người yêu thích mì cua, mùa cua chính là thời điểm đáng mong đợi nhất để thưởng thức món ăn này khi nguồn nguyên liệu đang vào mùa.",
    },
    { type: "h2", text: "6. Thưởng thức mì cua lông Thượng Hải tại Cung Hỷ Phát Tài" },
    {
      type: "p",
      text: "Set cua lông Thượng Hải tại Cung Hỷ Phát Tài là lựa chọn dành cho những thực khách muốn thưởng thức cua lông theo nhiều cách chế biến, từ đó cảm nhận trọn vẹn hơn vị ngọt của thịt cua và độ béo đặc trưng của mùa cua.",
    },
    {
      type: "p",
      text: "Bên cạnh chất lượng món ăn, nhà hàng sở hữu không gian Trung Hoa hiện đại, sang trọng và rộng rãi, phù hợp cho những buổi gặp gỡ gia đình, bạn bè, tiếp khách hay những bữa tiệc riêng tư.",
    },
    {
      type: "p",
      text: "Nếu bạn đang tìm địa chỉ ăn cua lông Thượng Hải tại Hà Nội, Cung Hỷ Phát Tài là một lựa chọn thích hợp để khám phá hương vị cua lông trong mùa cua năm nay.",
    },
    { type: "contact" },
    { type: "h2", text: "Câu hỏi thường gặp về mì cua lông Thượng Hải" },
    {
      type: "faq",
      items: [
        {
          question: "Mì cua lông Thượng Hải là món gì?",
          answer:
            "Mì cua lông Thượng Hải là món mì kết hợp với phần thịt và gạch cua lông đã được tách, chế biến thành phần xốt. Tên tiếng Trung thường gặp là 蟹粉面 (xièfěn miàn).",
        },
        {
          question: "Mì cua lông có phải luôn dùng cua hồ Dương Trừng không?",
          answer:
            "Không nhất thiết. Cua lông hồ Dương Trừng là một nguồn cua nổi tiếng và có giá trị trong ẩm thực Trung Quốc, nhưng tên “mì cua lông Thượng Hải” mô tả phong cách món ăn chứ không có nghĩa mọi phiên bản đều bắt buộc phải sử dụng cua từ hồ Dương Trừng.",
        },
        {
          question: "Mì cua lông có vị gì?",
          answer:
            "Món ăn nổi bật với vị ngọt tự nhiên của thịt cua, kết hợp cùng độ béo và hương thơm đậm của gạch cua. Sợi mì tạo nền về kết cấu, trong khi gừng hoặc giấm cua có thể được dùng để cân bằng độ béo.",
        },
        {
          question: "Vì sao mì cua lông có giá cao?",
          answer:
            "Giá món ăn thường chịu ảnh hưởng bởi cua lông là nguyên liệu theo mùa, lượng cua cần sử dụng và công đoạn tách thịt, gạch cua thủ công. Một phần mì sử dụng lượng cua lớn sẽ có chi phí nguyên liệu và chế biến cao hơn đáng kể so với mì thông thường.",
        },
        {
          question: "Mì cua lông ngon nhất vào mùa nào?",
          answer:
            "Món ăn thường được yêu thích nhất vào mùa cua, tập trung vào mùa thu và đầu đông. Thời điểm cụ thể có thể thay đổi tùy năm và nguồn cua.",
        },
      ],
    },
  ],

  "mi-cua-long-khac-mi-cua-thuong": [
    {
      type: "p",
      text: "Mì cua lông và mì cua thông thường đều có sự kết hợp giữa cua và mì, nhưng hai món ăn lại mang đến trải nghiệm khá khác nhau. Sự khác biệt không chỉ nằm ở loại cua được sử dụng mà còn ở cách xử lý phần cua, tỷ lệ nguyên liệu, hương vị và tính mùa vụ của món ăn.",
    },
    {
      type: "p",
      text: "Đặc biệt, mì cua lông gắn với văn hóa thưởng thức cua theo mùa tại Thượng Hải và vùng Giang Nam. Phần thịt, gạch cua cùng những thành phần đặc trưng của cua được tách riêng, chế biến thành phần cua đậm vị rồi kết hợp với mì. Đây cũng là lý do một bát mì nhìn khá đơn giản nhưng lại có thể đòi hỏi nhiều nguyên liệu và công sức chế biến.",
    },
    {
      type: "p",
      text: "Vậy mì cua lông khác mì cua thường như thế nào? Hãy cùng tìm hiểu qua những điểm khác biệt dưới đây.",
    },
    { type: "h2", text: "1. Khác nhau ngay từ loại cua được sử dụng" },
    {
      type: "p",
      text: "Điểm khác biệt đầu tiên và dễ nhận thấy nhất nằm ở nguyên liệu chính.",
    },
    {
      type: "p",
      text: "Mì cua thông thường không phải một món ăn có công thức cố định. Tùy từng vùng và nhà hàng, món mì có thể sử dụng nhiều loại cua khác nhau, từ cua biển đến cua nước ngọt, sau đó kết hợp với nước dùng, xốt hoặc các nguyên liệu khác.",
    },
    {
      type: "p",
      text: "Trong khi đó, mì cua lông Thượng Hải gắn với cua lông Trung Quốc — loại cua nổi tiếng trong văn hóa ẩm thực vùng Giang Nam và đặc biệt được nhắc đến nhiều mỗi độ thu về. Cua lông được yêu thích không chỉ bởi phần thịt mà còn bởi phần gạch ở cua cái và phần đặc trưng ở cua đực. Khi vào mùa, những thành phần này được sử dụng để chế biến thành nhiều món ăn, trong đó có mì cua kiểu Thượng Hải.",
    },
    {
      type: "p",
      text: "Vì vậy, khi nói đến mì cua lông, yếu tố quan trọng không chỉ là “có cua” mà là hương vị đặc trưng của chính loại cua theo mùa.",
    },
    { type: "h2", text: "2. Khác nhau ở cách chế biến" },
    {
      type: "p",
      text: "Mì cua thông thường có thể sử dụng nhiều loại xốt khác nhau. Phần xốt có thể được xây dựng theo khẩu vị riêng của từng nhà hàng, kết hợp thêm các loại gia vị để tạo nên một hương vị riêng biệt.",
    },
    {
      type: "p",
      text: "Với mì cua lông Thượng Hải, cách chế biến chú trọng vào việc làm nổi bật hương vị nguyên bản của cua.",
    },
    {
      type: "p",
      text: "Cua lông thường được nhúng vào hỗn hợp giấm gạo và nước tương, sau đó phủ gừng thái lát lên trên và hấp. Sau khi hấp chín, gạch cua cùng thịt cua ở thân, chân và càng được tách tỉ mỉ, giữ nguyên vẹn, không bị vỡ nát, sau đó làm thành phần xốt. Gia vị vẫn được sử dụng để tạo độ hài hòa và chiều sâu, nhưng các thành phần được cân đối để giữ lại vị ngọt, độ béo và hương thơm đặc trưng của cua.",
    },
    { type: "h2", text: "3. Khác nhau ở hương vị" },
    {
      type: "p",
      text: "Mì cua thông thường có thể mang nhiều phong cách khác nhau. Có công thức thiên về vị béo, có nơi làm xốt đậm đà hơn hoặc kết hợp thêm nhiều nguyên liệu để tạo dấu ấn riêng.",
    },
    {
      type: "p",
      text: "Mì cua lông lại hướng đến một trải nghiệm tập trung hơn vào hương vị của chính cua lông. Phần thịt cua săn chắc, mang vị ngọt tự nhiên, trong khi gạch cua sánh vàng, béo ngậy, đậm đà và thơm ngon hơn hẳn cua thường.",
    },
    {
      type: "p",
      text: "Với mỗi tô mì cua lông Thượng Hải, người ta phải sử dụng đến 12 con cua lông. Bên cạnh thịt cua, gạch cua và mì, món mì cua lông Thượng Hải còn được cho thêm dấm, muối và hành tây. Chính vì gia vị đơn giản mà món ăn này vẫn giữ hầu như nguyên vẹn hương vị tự nhiên nhất.",
    },
    {
      type: "p",
      text: "Khi khách gọi món, đa phần các nhà hàng để phần xốt riêng, mì riêng để khách tự trộn, nhưng cũng có những nơi phục vụ phần xốt chung một bát. Gọi là mì cua lông, nhưng khi nhìn vào bát, thực khách sẽ thấy lượng thịt xốt cua bao phủ toàn bộ tô mì. Lượng mì tuy không nhiều nhưng tinh túy của món ăn nằm ở đây, bởi vị đậm đà của phần xốt đã ngấm vào sợi mì.",
    },
    {
      type: "ul",
      items: [
        "Mì cua thông thường: mì và cua cùng tạo nên món ăn.",
        "Mì cua lông Thượng Hải: mì được sử dụng để làm nổi bật hương vị của cua.",
      ],
    },
    { type: "h2", text: "4. Mì cua lông mang tính mùa vụ rõ rệt hơn" },
    {
      type: "p",
      text: "Mì cua thông thường có thể được phục vụ quanh năm nếu loại cua và nguyên liệu phù hợp. Trong khi đó, mì cua lông gắn với mùa cua lông.",
    },
    {
      type: "p",
      text: "Tại Thượng Hải, mùa cua lông thường được nhắc đến vào mùa thu và kéo dài sang đầu mùa đông. Đây là thời điểm cua được đưa vào nhiều món ăn đặc trưng, từ cua hấp nguyên con đến các món sử dụng phần cua đã tách như mì cua, cơm cua hay các món dimsum.",
    },
    {
      type: "p",
      text: "Mùa vụ cũng ảnh hưởng đến cách thưởng thức cua đực và cua cái. Quy tắc “Cửu thư thập hùng” thường được dùng để nói về tháng 9 âm lịch thiên về cua cái và tháng 10 âm lịch thiên về cua đực.",
    },
    {
      type: "p",
      text: "Chính yếu tố mùa vụ khiến mì cua lông có một sức hấp dẫn riêng. Món ăn không chỉ đơn thuần là một lựa chọn trong thực đơn mà còn gắn với thời điểm trong năm khi cua đạt chất lượng được mong đợi.",
    },
    { type: "h2", text: "5. Thưởng thức mì cua lông Thượng Hải tại Cung Hỷ Phát Tài" },
    {
      type: "p",
      text: "Tại Cung Hỷ Phát Tài, nhà hàng phục vụ set xốt cua lông Thượng Hải bao gồm 4 loại: xốt gạch cua, xốt thịt cua, xốt chân cua và xốt bào ngư. Thực khách có thể lựa chọn ăn kèm với mì hoặc cơm.",
    },
    {
      type: "p",
      text: "Không gian nhà hàng theo phong cách Trung Hoa hiện đại, sang trọng, phù hợp cho những buổi gặp gỡ gia đình, bạn bè, tiếp đãi đối tác hay tổ chức tiệc trong không gian riêng tư.",
    },
    {
      type: "p",
      text: "Ghé Cung Hỷ Phát Tài để thưởng thức cua lông trong mùa thu năm nay.",
    },
    { type: "contact" },
    { type: "h2", text: "Câu hỏi thường gặp về mì cua lông" },
    {
      type: "faq",
      items: [
        {
          question: "Mì cua lông khác mì cua thường ở điểm nào?",
          answer:
            "Khác biệt chủ yếu nằm ở loại cua, cách xử lý phần cua, tính mùa vụ và hương vị. Mì cua lông thường sử dụng cua lông theo mùa, tách thịt và các phần đặc trưng của cua để chế biến thành phần xốt rồi kết hợp cùng mì, chú trọng vào hương vị nguyên bản của cua.",
        },
        {
          question: "Mì cua lông có phải là mì cua hồ Dương Trừng không?",
          answer:
            "Không nhất thiết. Cua lông hồ Dương Trừng là một nguồn cua lông nổi tiếng, nhưng “mì cua lông” mô tả phong cách món ăn chứ không đồng nghĩa mọi phần mì đều bắt buộc sử dụng cua từ hồ Dương Trừng.",
        },
        {
          question: "Mì cua lông ăn ngon nhất vào mùa nào?",
          answer:
            "Món ăn thường gắn với mùa cua vào mùa thu và đầu đông, kéo dài từ tháng 9 đến tháng 12 hằng năm. Thời điểm cụ thể có thể thay đổi tùy năm.",
        },
        {
          question: "Vì sao mì cua lông có giá cao?",
          answer:
            "Giá món ăn chịu ảnh hưởng bởi giá cua theo mùa, lượng cua cần sử dụng và công đoạn tách thịt, gạch cua thủ công. Một phần mì sử dụng nhiều cua sẽ có chi phí nguyên liệu và chế biến cao hơn mì thông thường.",
        },
        {
          question: "Mì cua lông có vị như thế nào?",
          answer:
            "Món ăn thường nổi bật với vị ngọt tự nhiên của thịt cua cùng độ béo và hương thơm của phần gạch cua. Khi kết hợp với mì, phần cua tạo nên hương vị đậm và cô đọng hơn so với nhiều món mì cua thông thường.",
        },
      ],
    },
  ],
};
