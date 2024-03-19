<!-- <!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>{{$test->name}}</title>

		<style>
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
	</head>

	<body>
		<div class="test-header">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<!-- <td class="title">
									<img
										src="ChallengeCreator\resources\js\Pages\logo.png"
										style="width: 100%; max-width: 300px"
									/>
								</td>
								<td>
									Invoice #: 123<br />
									Exam Date: {{ date('d/m/Y') }}<br />
									Time: XX Minutes<br />
									Created date: {{$test->created_at}}<br />
									Last updated: {{$test->updated_at}}
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
        <div class="test-body">
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
	</body>
</html> -->

<!DOCTYPE html>
<html>
<head>

    <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_SVG">
        MathJax.Hub.Register.StartupHook("End",function () {
          var list = document.getElementsByTagName("svg");
          for (var i = 1; i < list.length; i++) {
            var w = list[i].getAttribute("width");
            var h = list[i].getAttribute("height");
             list[i].style.width = w;
             list[i].style.height = h;
             list[i].removeAttribute("focusable");
             list[i].removeAttribute("aria-hidden");
             list[i].removeAttribute("role");
           }

           var gList = document.getElementsByTagName("g");
           for (var i = 0; i < gList.length; i++) {
             gList[i].setAttribute("fill", "#000");
            }

            document.querySelectorAll(".MJX_Assistive_MathML").forEach(function(a){
              a.remove()
            });

          document.getElementById("bodydata").value=encodeURIComponent(document.body.innerHTML);
          var el = document.getElementById("pdfform");
          el.submit();
        });
      </script>

</head>
<body>

<h3>The Cauchy-Schwarz Inequality (TeX)</h3>
\[ \left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right) \]

<h3>Standard Deviation (MathML)</h3>
<math display="block"><mrow><mi>&#x03c3;</mi><mo>=</mo><msqrt><mrow><mfrac><mrow><mn>1</mn></mrow><mrow><mi>N</mi></mrow></mfrac><mstyle displaystyle="true"><mrow><munderover><mrow><mo>&#x2211;</mo></mrow><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><mi>N</mi></mrow></munderover><mrow><msup><mrow><mo stretchy="false">(</mo><msub><mrow><mi>x</mi></mrow><mrow><mi>i</mi></mrow></msub><mo>&#x2212;</mo><mi>&#x03bc;</mi><mo stretchy="false">)</mo></mrow><mrow><mn>2</mn></mrow></msup></mrow></mrow></mstyle></mrow></msqrt><mo>.</mo></mrow></math>

<h3>Inline equation (TeX)</h3>
<p>Finally, while display equations look good for a page of samples, the ability to mix math and text in a paragraph is also important. This expression \(\sqrt{3x-1}+(1+x)^2\) is an example of an inline equation.  As you see, MathJax equations can be used this way as well, without unduly disturbing the spacing between lines.</p>

<!-- This block of code adds a button to send the processed HTML code to your script: MathJaxProcess.php -->
<div id="mpdf-create">
	<form autocomplete="off" action="MathJaxProcess.php" method="POST" id="pdfform" onSubmit="document.getElementById('bodydata').value=encodeURIComponent(document.body.innerHTML);">
		<input type="submit" value="PDF" name="PDF"/>
		<input type="submit" value="SVG" name="SVG"/>
		<input type="hidden" value="" id="bodydata" name="bodydata" />
	</form>
</div>

</body>
</html>
