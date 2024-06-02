<!DOCTYPE html>
<html>
<!-- Linking to CDN -->
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

<!-- Configuration of mathjax -->
<script>
    MathJax = {
        tex: {
            inlineMath: [['$', '$'],
            ['\\(', '\\)']]
        },
        svg: {
            fontCache: 'global'
        }
    };
</script>

<head>
    <meta charset="utf-8" />
    <title>{{$test->name}}</title>

    <style>
        .pagebreak {
            page-break-before: always;
            clear: both;
        }

        .test-header {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif, "Times New Roman";
            color: #555;
        }

        .test-header table {
            width: 100%;
            line-height: inherit;
            text-align: left;
        }

        .test-header table td {
            padding: 5px;
            vertical-align: top;
        }

        .test-header table tr td:nth-child(2) {
            text-align: right;
        }

        .test-header table tr.top table td {
            padding-bottom: 20px;
        }

        .test-header table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }

        .test-header table tr.information table td {
            padding-bottom: 40px;
        }

        .test-header table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }

        .test-header table tr.details td {
            padding-bottom: 20px;
        }

        .test-header table tr.item td {
            border-bottom: 1px solid #eee;
        }

        .test-header table tr.item.last td {
            border-bottom: none;
        }

        .test-header table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }

        @media only screen and (max-width: 600px) {
            .test-header table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
            }

            .test-header table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
            }
        }

        /** RTL **/
        .test-header.rtl {
            direction: rtl;
            font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }

        .test-header.rtl table {
            text-align: right;
        }

        .test-header.rtl table tr td:nth-child(2) {
            text-align: left;
        }

        .test-body {
            font-family: 'DejaVu Serif', 'serif';
        }
    </style>

    <style type="text/css">
        .tg1 {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%
        }

        .tg1 td {
            border-color: black;
            border-style: solid;
            border-width: 1px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            overflow: hidden;
            padding: 10px 5px;
            word-break: normal;
        }

        .tg1 th {
            border-color: black;
            border-style: solid;
            border-width: 1px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            font-weight: normal;
            overflow: hidden;
            padding: 10px 5px;
            word-break: normal;
        }

        .tg1 .tg-9wq8 {
            border-color: inherit;
            text-align: center;
            vertical-align: middle
        }

        .tg1 .tg-53v8 {
            border-color: inherit;
            font-family: "Times New Roman", Times, serif !important;
            font-weight: bold;
            text-align: left;
            vertical-align: top
        }

        .tg1 .tg-iucd {
            border-color: inherit;
            font-family: "Times New Roman", Times, serif !important;
            text-align: left;
            vertical-align: top
        }

        .tg1 .tg-76x8 {
            border-color: inherit;
            font-family: "Times New Roman", Times, serif !important;
            font-style: italic;
            text-align: left;
            vertical-align: top
        }
    </style>

    <style type="text/css">
        .tg {
            border-collapse: collapse;
            border-spacing: 0;
            margin: 0px auto;
            width: 100%
        }

        .tg td {
            border-color: black;
            border-style: solid;
            border-width: 1px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            overflow: hidden;
            padding: 10px 5px;
            word-break: normal;
        }

        .tg th {
            border-color: black;
            border-style: solid;
            border-width: 1px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            font-weight: normal;
            overflow: hidden;
            padding: 10px 5px;
            word-break: normal;
        }

        .tg .tg-uzvj {
            border-color: inherit;
            font-weight: bold;
            text-align: center;
            vertical-align: middle
        }

        .tg .tg-g7sd {
            border-color: inherit;
            font-weight: bold;
            text-align: left;
            vertical-align: middle
        }

        .tg .tg-0pky {
            border-color: inherit;
            text-align: left;
            vertical-align: top
        }

        .tg .tg-dvpl {
            border-color: inherit;
            text-align: right;
            vertical-align: top
        }
    </style>
</head>

<body>
    <table class="tg1">
        <tbody>
            <tr>
                <td class="tg-53v8">Giảng viên ra đề:</td>
                <td class="tg-iucd"><span style="font-style:italic">25/08/2021</span></td>
                <td class="tg-53v8">Người phản biện:</td>
                <td class="tg-76x8">25/08/2022</td>
            </tr>
            <tr>
                <td class="tg-9wq8" colspan="2">Nguyễn An Khương<br>Nguyễn Tiến Thịnh</td>
                <td class="tg-9wq8" colspan="2">BM KHMT/Khoa KH&amp;KT Máy tính</td>
            </tr>
        </tbody>
    </table>

    <br>

    <div class="tg-wrap">
        <table class="tg">
            <tbody>
                <tr>
                    <td class="tg-uzvj" rowspan="5"><img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HCMUT_official_logo.png/891px-HCMUT_official_logo.png"
                            alt="Image" width="99" height="100"><br>TRƯỜNG ĐẠI HỌC BÁCH KHOA - ĐHQG-HCM<br>KHOA
                        KH&amp;KT MÁY TÍNH
                    </td>
                    <td class="tg-g7sd" rowspan="2">THI CUỐI KỲ</td>
                    <td class="tg-0pky">HK/NH</td>
                    <td class="tg-0pky">3</td>
                    <td class="tg-0pky">2022-2023</td>
                </tr>
                <tr>
                    <td class="tg-0pky">Ngày thi</td>
                    <td class="tg-dvpl" colspan="2">26/08/2022</td>
                </tr>
                <tr>
                    <td class="tg-0pky">Môn học</td>
                    <td class="tg-0pky" colspan="3">Mô hình hóa Toán học</td>
                </tr>
                <tr>
                    <td class="tg-0pky">Course ID</td>
                    <td class="tg-0pky" colspan="3">CO2011</td>
                </tr>
                <tr>
                    <td class="tg-0pky">Thời lượng</td>
                    <td class="tg-0pky">80 phút</td>
                    <td class="tg-0pky">Mã đề</td>
                    <td class="tg-dvpl">2681</td>
                </tr>
                <tr>
                    <td class="tg-0pky" colspan="5">Ghi chú: 
                    <div>
                      <div>- Sinh viên được phép sử dụng 01 tờ giấy A4 viết tay có chứa ghi chép cần thiết.</div>
                      <div>- SV phải ghi MSSV, họ và tên vào cuối trang này và nộp lại đề thi cùng với bài làm.</div>
                      <div>- Chọn phương án đúng nhất (chỉ chọn 1) cho mỗi câu hỏi.</div>
                    </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- <div class="test-body">
                @foreach ($questions as $index => $mcq)
                    <div class="mcq-item">
                        <p>{{ $index + 1 }}. {{ $mcq->question }}</p>
                        <ol type="A">
                            @for ($i = 1; $i <= 6; $i++)
                                @if (!empty($mcq['ans'.$i]))
                                    <li>{{ $mcq['ans'.$i] }}</li>
                                @endif
                            @endfor
                        </ol>
                    </div>
                @endforeach
        </div>
        <div class="pagebreak"></div>
        <div class="key">
            <h2>Answer Key</h2>
            @foreach ($questions as $index => $mcq)
                <div class="key">
                    <p>{{ $index + 1 }}. {{ $mcq->correct }}</p>
                </div>
            @endforeach
        </div>
        <div class="pagebreak"></div>
        @endforeach -->

<style>
.leaders {
  list-style: none;
  margin: 0;
  padding: 0;
}

.leaders div {
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 5px;
  justify-items: start;
  align-items: center;
  justify-content: start;
}
  </style>
  
  <div class="leaders">
  <div>
    <span>MSSV</span>
    <span>.............................................</span>
    <span>Họ & tên</span>
    <span>.............................................</span>
    <span>Mã đề: 1821</span>
    <!-- <span>..............................</span> -->
    <span>Trang </span>
    <span>... / ...</span>
  </div>
</div>

</body>

</html>