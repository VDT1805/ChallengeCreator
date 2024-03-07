<!DOCTYPE html>
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
								<td class="title">
									<img
										src="D:\Pony\dacn-cnpm\ChallengeCreator\resources\js\Pages\logo.png"
										style="width: 100%; max-width: 300px"
									/>
								</td>

								<td>
									{{-- Invoice #: 123<br /> --}}
									Exam Date: {{ date('d-m-Y') }}<br />
									Time: XX Minutes
								</td>
							</tr>
						</table>
					</td>
				</tr>

				{{-- <tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									Sparksuite, Inc.<br />
									12345 Sunny Road<br />
									Sunnyville, CA 12345
								</td>

								<td>
									Acme Corp.<br />
									John Doe<br />
									john@example.com
								</td>
							</tr>
						</table>
					</td>
				</tr> --}}

				{{-- <tr class="heading">
					<td>Payment Method</td>

					<td>Check #</td>
				</tr>

				<tr class="details">
					<td>Check</td>

					<td>1000</td>
				</tr> --}}

				<tr class="heading">
					<td>Lorem Ipsum</td>

					<td>Lorem Ipsum</td>
				</tr>

				<tr class="item">
					<td>Lorem Ipsum</td>

					<td>Lorem Ipsum</td>
				</tr>

				<tr class="item">
					<td>Lorem Ipsum</td>

					<td>Lorem Ipsum</td>
				</tr>

				<tr class="item last">
					<td>Lorem Ipsum</td>

					<td>Lorem Ipsum</td>
				</tr>

				<tr class="total">
					<td>Lorem Ipsum</td>

					<td>Lorem Ipsum</td>
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
</html>
