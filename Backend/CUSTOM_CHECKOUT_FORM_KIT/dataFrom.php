<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database connection
$servername = "localhost";
$username = "root";
// $password = "rootroot";
$password = "";
$dbname = "waltzer"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$orderId = $_GET['orderId'] ?? null;
if ($orderId) {
    // Process the OrderId as needed
    //echo "Order ID: $orderId";
	$sql = "SELECT 
        checkout.Id AS checkoutId,
        checkout.OrderId,
        ROUND(checkout.price, 2) AS checkoutPrice,
        checkout.timestamp AS checkoutTimestamp,
        checkout.customerName,
        checkout.phone,
        checkout.addressId,
        checkout.userId,
        checkout.paymode,
        order_items.Id AS orderItemId,
        order_items.OrderId AS orderItemOrderId,
        order_items.productId,
        order_items.productName AS orderItemProductName,
        order_items.quantity,
        order_items.price AS orderItemPrice,
        order_items.timestamp AS orderItemTimestamp,
        useraddress.*,
		user.email AS userEmail,
        products.*  
    FROM 
        checkout
    JOIN 
        order_items ON checkout.Id = order_items.OrderId
    JOIN 
        useraddress ON checkout.addressId = useraddress.addressId
    JOIN 
        user ON checkout.userId = user.Id
    JOIN 
        products ON order_items.productId = products.Id
    WHERE 
        checkout.OrderId = ?";
			
		// Check if any rows are returned
		$stmt = $conn->prepare($sql);
		$stmt->bind_param("s", $orderId); // Bind the parameter
		$stmt->execute();
		$data = $stmt->get_result();
	
		// Fetch the result and return it as JSON
		if ($data->num_rows > 0) {
			$result = $data->fetch_assoc();
		} else {
			echo "No order details found for Order ID: $orderId";
			exit;
		}
		$stmt->close();
} else {
    echo "Order ID not provided.";
}
  ?>
<html>
<head>
<script>
	window.onload = function() {
		var d = new Date().getTime();
		document.getElementById("tid").value = d;
	};
</script>
<style>
	.checkout-form {
    max-width: 800px;
    margin: 2rem auto;
    font-family: 'Segoe UI', sans-serif;
}

.order-title {
    text-align: center;
    color: #ff6b00;
    font-size: 24px;
    margin-bottom: 2rem;
}

.checkout-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    border-radius: 12px;
    overflow: hidden;
}

.checkout-table td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #eee;
}

.checkout-table td:first-child {
    background-color: #ff6b00;
    color: white;
    font-weight: 500;
    width: 35%;
}

.section-header td {
    background-color: #ffffff !important;
    color: black !important;
    font-weight: bold;
    font-size: 1.1em;
    padding: 1.2rem 1.5rem;
}

.checkout-input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
}

.checkout-input[readonly] {
    background-color: #f8f8f8;
}

.submit-row td {
    background-color: white !important;
    padding: 1.5rem;
}

.checkout-submit {
    background-color: #ff6b00;
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
}

.checkout-submit:hover {
    background-color: #ff8533;
    transform: translateY(-1px);
}
</style>
</head>
<body>
<form method="POST" name="customerData" action="ccavRequestHandler.php" class="checkout-form">
    <h1 class="order-title">Order Information</h1>
    
    <table class="checkout-table">
        <input type="hidden" name="tid" id="tid"/>
        <input type="hidden" name="merchant_id" value="2477595"/>
        <input type="hidden" name="currency" value="INR"/>
        <input type="hidden" name="redirect_url" value="https://waltzify.com/api/CUSTOM_CHECKOUT_FORM_KIT/ccavResponseHandler.php"/>
        <input type="hidden" name="cancel_url" value="https://waltzify.com/api/CUSTOM_CHECKOUT_FORM_KIT/ccavResponseHandler.php"/>
        <input type="hidden" name="language" value="EN"/>
        
        <tr>
            <td>Order Id:</td>
            <td><input type="text" class="checkout-input" name="order_id" value="<?php echo $orderId; ?>" readonly/></td>
        </tr>
        <tr>
            <td>Amount:</td>
            <td><input type="text" class="checkout-input" name="amount" value="<?php echo $result['checkoutPrice']; ?>" readonly/></td>
        </tr>
        
        <tr class="section-header">
            <td colspan="2">Billing Information :</td>
        </tr>
        
        <tr>
            <td>Billing Name:</td>
            <td><input type="text" class="checkout-input" name="billing_name" value="<?php echo $result['customerName'] ?>" readonly/></td>
        </tr>
        <tr>
            <td>Billing Address:</td>
            <td><input type="text" class="checkout-input" name="billing_address" value="<?php echo $result['Address1'] ?>" readonly/></td>
        </tr>
        <tr>
            <td>Billing City:</td>
            <td><input type="text" class="checkout-input" name="billing_city" value="<?php echo $result['City'] ?>" readonly/></td>
        </tr>
        <tr>
            <td>Billing State:</td>
            <td><input type="text" class="checkout-input" name="billing_state" value="<?php echo $result['State'] ?>" readonly/></td>
        </tr>
        <tr>
            <td>Billing Zip:</td>
            <td><input type="text" class="checkout-input" name="billing_zip" value="<?php echo $result['Pincode'] ?>" readonly/></td>
        </tr>
        <tr>
            <td>Billing Country:</td>
            <td><input type="text" class="checkout-input" name="billing_country" value="India" readonly/></td>
        </tr>
        <tr>
            <td>Billing Tel:</td>
            <td><input type="text" class="checkout-input" name="billing_tel" value="<?php echo $result['Number'] ?>" readonly/></td>
        </tr>
        <tr>
            <td>Billing Email:</td>
            <td><input type="text" class="checkout-input" name="billing_email" value="<?php echo $result['userEmail'] ?>" readonly/></td>
        </tr>
        
        <tr class="submit-row">
            <td colspan="2">
                <input type="submit" class="checkout-submit" value="Proceed"/>
            </td>
        </tr>
    </table>
</form>
</body>
<!-- <script language="javascript" type="text/javascript" src="json.js"></script>-->
<!-- <script src="jquery-1.7.2.min.js"></script>-->
 <script language="javascript" type="text/javascript" src="json.js"></script>
 <script src="jquery-1.7.2.min.js"></script>
<script type="text/javascript">
  $(function(){
  
  	  var jsonData;
  	  var access_code="AVXR69KE58BY52RXYB" // shared by CCAVENUE 
	  var amount="6000.00";
  	  var currency="INR";
  	  
      $.ajax({
           url:'https://secure.ccavenue.com/transaction/transaction.do?command=getJsonData&access_code='+access_code+'&currency='+currency+'&amount='+amount,
           dataType: 'jsonp',
           jsonp: false,
           jsonpCallback: 'processData',
           success: function (data) { 
                 jsonData = data;
                 // processData method for reference
                 processData(data); 
		 // get Promotion details
                 $.each(jsonData, function(index,value) {
			if(value.Promotions != undefined  && value.Promotions !=null){  
				var promotionsArray = $.parseJSON(value.Promotions);
		               	$.each(promotionsArray, function() {
					var	promotions=	"<option value="+this['promoId']+">"
					+this['promoName']+" - "+this['promoPayOptTypeDesc']+"-"+this['promoCardName']+" - "+currency+" "+this['discountValue']+"  "+this['promoType']+"</option>";
					$("#promo_code").find("option:last").after(promotions);
				});
			}
		});
           },
           error: function(xhr, textStatus, errorThrown) {
               alert('An error occurred! ' + ( errorThrown ? errorThrown :xhr.status ));
           }
   		});
   		
   		$(".payOption").click(function(){
   			var paymentOption="";
   			var cardArray="";
   			var payThrough,emiPlanTr;
		    var emiBanksArray,emiPlansArray;
   			
           	paymentOption = $(this).val();
           	$("#card_type").val(paymentOption.replace("OPT",""));
           	$("#card_name").children().remove(); // remove old card names from old one
            $("#card_name").append("<option value=''>Select</option>");
           	$("#emi_div").hide();
           	
           	$.each(jsonData, function(index,value) {
            	  if(paymentOption !="OPTEMI"){
	            	 if(value.payOpt==paymentOption){
	            		cardArray = $.parseJSON(value[paymentOption]);
	                	$.each(cardArray, function() {
	    	            	$("#card_name").find("option:last").after("<option class='"+this['dataAcceptedAt']+" "+this['status']+"'  value='"+this['cardName']+"'>"+this['cardName']+"</option>");
	                	});
	                 }
	              }
	              
	              if(paymentOption =="OPTEMI"){
		              if(value.payOpt=="OPTEMI"){
		              	$("#emi_div").show();
		              	$("#card_type").val("CRDC");
		              	$("#data_accept").val("Y");
		              	$("#emi_plan_id").val("");
						$("#emi_tenure_id").val("");
						$("span.emi_fees").hide();
		              	$("#emi_banks").children().remove();
		              	$("#emi_banks").append("<option value=''>Select your Bank</option>");
		              	$("#emi_tbl").children().remove();
		              	
	                    emiBanksArray = $.parseJSON(value.EmiBanks);
	                    emiPlansArray = $.parseJSON(value.EmiPlans);
	                	$.each(emiBanksArray, function() {
	    	            	payThrough = "<option value='"+this['planId']+"' class='"+this['BINs']+"' id='"+this['subventionPaidBy']+"' label='"+this['midProcesses']+"'>"+this['gtwName']+"</option>";
	    	            	$("#emi_banks").append(payThrough);
	                	});
	                	
	                	emiPlanTr="<tr><td>&nbsp;</td><td>EMI Plan</td><td>Monthly Installments</td><td>Total Cost</td></tr>";
							
	                	$.each(emiPlansArray, function() {
		                	emiPlanTr=emiPlanTr+
							"<tr class='tenuremonth "+this['planId']+"' id='"+this['tenureId']+"' style='display: none'>"+
								"<td> <input type='radio' name='emi_plan_radio' id='"+this['tenureMonths']+"' value='"+this['tenureId']+"' class='emi_plan_radio' > </td>"+
								"<td>"+this['tenureMonths']+ "EMIs. <label class='merchant_subvention'>@ <label class='emi_processing_fee_percent'>"+this['processingFeePercent']+"</label>&nbsp;%p.a</label>"+
								"</td>"+
								"<td>"+this['currency']+"&nbsp;"+this['emiAmount'].toFixed(2)+
								"</td>"+
								"<td><label class='currency'>"+this['currency']+"</label>&nbsp;"+ 
									"<label class='emiTotal'>"+this['total'].toFixed(2)+"</label>"+
									"<label class='emi_processing_fee_plan' style='display: none;'>"+this['emiProcessingFee'].toFixed(2)+"</label>"+
									"<label class='planId' style='display: none;'>"+this['planId']+"</label>"+
								"</td>"+
							"</tr>";
						});
						$("#emi_tbl").append(emiPlanTr);
	                 } 
                  }
           	});
           	
         });
   
	  
      $("#card_name").click(function(){
      	if($(this).find(":selected").hasClass("DOWN")){
      		alert("Selected option is currently unavailable. Select another payment option or try again later.");
      	}
      	if($(this).find(":selected").hasClass("CCAvenue")){
      		$("#data_accept").val("Y");
      	}else{
      		$("#data_accept").val("N");
      	}
      });
          
     // Emi section start      
          $("#emi_banks").live("change",function(){
	           if($(this).val() != ""){
	           		var cardsProcess="";
	           		$("#emi_tbl").show();
	           		cardsProcess=$("#emi_banks option:selected").attr("label").split("|");
					$("#card_name").children().remove();
					$("#card_name").append("<option value=''>Select</option>");
				    $.each(cardsProcess,function(index,card){
				        $("#card_name").find("option:last").after("<option class=CCAvenue value='"+card+"' >"+card+"</option>");
				    });
					$("#emi_plan_id").val($(this).val());
					$(".tenuremonth").hide();
					$("."+$(this).val()+"").show();
					$("."+$(this).val()).find("input:radio[name=emi_plan_radio]").first().attr("checked",true);
					$("."+$(this).val()).find("input:radio[name=emi_plan_radio]").first().trigger("click");
					 
					 if($("#emi_banks option:selected").attr("id")=="Customer"){
						$("#processing_fee").show();
					 }else{
						$("#processing_fee").hide();
					 }
					 
				}else{
					$("#emi_plan_id").val("");
					$("#emi_tenure_id").val("");
					$("#emi_tbl").hide();
				}
				
				
				
				$("label.emi_processing_fee_percent").each(function(){
					if($(this).text()==0){
						$(this).closest("tr").find("label.merchant_subvention").hide();
					}
				});
				
		 });
		 
		 $(".emi_plan_radio").live("click",function(){
			var processingFee="";
			$("#emi_tenure_id").val($(this).val());
			processingFee=
					"<span class='emi_fees' >"+
			 			"Processing Fee:"+$(this).closest('tr').find('label.currency').text()+"&nbsp;"+
			 			"<label id='processingFee'>"+$(this).closest('tr').find('label.emi_processing_fee_plan').text()+
			 			"</label><br/>"+
                			"Processing fee will be charged only on the first EMI."+
                	"</span>";
             $("#processing_fee").children().remove();
             $("#processing_fee").append(processingFee);
             
             // If processing fee is 0 then hiding emi_fee span
             if($("#processingFee").text()==0){
             	$(".emi_fees").hide();
             }
			  
		});
		
		
		$("#card_number").focusout(function(){
			/*
			 emi_banks(select box) option class attribute contains two fields either allcards or bin no supported by that emi 
			*/ 
			if($('input[name="payment_option"]:checked').val() == "OPTEMI"){
				if(!($("#emi_banks option:selected").hasClass("allcards"))){
				  if(!$('#emi_banks option:selected').hasClass($(this).val().substring(0,6))){
					  alert("Selected EMI is not available for entered credit card.");
				  }
			   }
		   }
		  
		});
			
			
	// Emi section end 		
   
   
   // below code for reference 
 
   function processData(data){
         var paymentOptions = [];
         var creditCards = [];
         var debitCards = [];
         var netBanks = [];
         var cashCards = [];
         var mobilePayments=[];
         $.each(data, function() {
         	 // this.error shows if any error   	
              paymentOptions.push(this.payOpt);
              switch(this.payOpt){
                case 'OPTCRDC':
                	var jsonData = this.OPTCRDC;
                 	var obj = $.parseJSON(jsonData);
                 	$.each(obj, function() {
                 		creditCards.push(this['cardName']);
                	});
                break;
                case 'OPTDBCRD':
                	var jsonData = this.OPTDBCRD;
                 	var obj = $.parseJSON(jsonData);
                 	$.each(obj, function() {
                 		debitCards.push(this['cardName']);
                	});
                break;
              	case 'OPTNBK':
	              	var jsonData = this.OPTNBK;
	                var obj = $.parseJSON(jsonData);
	                $.each(obj, function() {
	                 	netBanks.push(this['cardName']);
	                });
                break;
                
                case 'OPTCASHC':
                  var jsonData = this.OPTCASHC;
                  var obj =  $.parseJSON(jsonData);
                  $.each(obj, function() {
                  	cashCards.push(this['cardName']);
                  });
                 break;
                   
                  case 'OPTMOBP':
                  var jsonData = this.OPTMOBP;
                  var obj =  $.parseJSON(jsonData);
                  $.each(obj, function() {
                  	mobilePayments.push(this['cardName']);
                  });
              }
              
            });
           
            
      }
  });
</script>
</html>
